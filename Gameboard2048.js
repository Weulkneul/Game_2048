"user strict";

define("GameBoard2048", [],
function () {
	class GameBoard2048 {

		getMatrix() {
			return this._matrix;
		}

		getSize() {
			return this._size;
		}

		getScore() {
			return this._score;
		}

		_getRandomFreeCell() {
			let zahl = 0;
			//While-Schleife läuft solange bis eine Zahl zwischen 1 und Size² gefunden wurde, die eine leere Position im Array findet
			do {
				zahl = Math.floor(Math.random() * this.getSize() * this.getSize()) + 1;
			} while (this.getMatrix()[this._getRow(zahl)][this._getColumn(zahl)] !== 0);
			return zahl;
		}

		_getRandomCellValue() {
			const CELLVALUEPROBABILITYSPAWNINGTWO = 0.9;
			const CELLVALUETWO = 2;
			const CELLVALUEFOUR = 4;
			return Math.random() < CELLVALUEPROBABILITYSPAWNINGTWO ? CELLVALUETWO : CELLVALUEFOUR;
		}

		_getRow(index) {
			return Math.ceil(index / this.getSize()) - 1;
		}

		_getColumn(index) {
			return index % this.getSize() === 0 ? this.getSize() - 1 : (index % this.getSize()) - 1;
		}

		constructor(size) {
			this._size = size;
			this._matrix = new Array(size);
			this._score = 0;
			//size x size Matrix mit Nullen befüllen
			for (let i = 0; i < size; i++) {
				this._matrix[i] = new Array(size);
				for (let j = 0; j < size; j++) {
					this._matrix[i][j] = 0;
				}
			}

			this._spawnNumber();
			this._spawnNumber();
		}

		printMatrix() {
			for (let i = 0; i < this.getSize(); i++) {
				console.log(this.getMatrix()[i]);
			}
			console.log("\n");
		}

		_addToScore(points) {
			this._score += points;
		}

		_spawnNumber() {
			let zahl = this._getRandomFreeCell();
			this.getMatrix()[this._getRow(zahl)][this._getColumn(zahl)] = this._getRandomCellValue();
		}

		checkGameOver() {
			for (let i = 0; i < this.getMatrix().length; i++) {
				for (let j = 0; j < this.getMatrix()[i].length; j++) {
					//Überprüft eine leere Stelle vorkommt -> Nicht zu Ende
					if (this.getMatrix()[i][j] === 0) {
						return false;
					//Überprüft die Nachbarn erste Zeile außer die beiden äußeren Spalten auf Gleichheit(links, unten, rechts)
					}
					else if (i === 0 && (j < this.getMatrix()[i].length - 1 && j > 0) && ((this.getMatrix()[i][j] === this.getMatrix()[i][j - 1]) || (this.getMatrix()[i][j] === this.getMatrix()[i + 1][j]) || (this.getMatrix()[i][j] === this.getMatrix()[i][j + 1]))) {
						return false;
					//Überprüft die Nachbarn alles außer erste und zweite Zeile nur für die erste und letzte Spalte auf Gleichheit(oben, unten)
					}
					else if ((i > 0 && i < this.getMatrix().length - 1) && (j === 0 || j === this.getMatrix()[i].length - 1) && ((this.getMatrix()[i][j] === this.getMatrix()[i - 1][j]) || (this.getMatrix()[i][j] === this.getMatrix()[i + 1][j]))) {
						return false;
					//Überprüft die Nachbarn alles außer erste und zweite Zeile für die anderen Spalten auf Gleichheit(links, unten, oben, rechts)
					}
					else if ((i > 0 && i < this.getMatrix().length - 1) && (j > 0 && j < this.getMatrix()[i].length - 1) && ((this.getMatrix()[i][j] === this.getMatrix()[i][j - 1]) || (this.getMatrix()[i][j] === this.getMatrix()[i - 1][j]) || (this.getMatrix()[i][j] === this.getMatrix()[i + 1][j]) || (this.getMatrix()[i][j] === this.getMatrix()[i][j + 1]))) {
						return false;
					//Überprüft die Nachbarn letzte Zeile außer die beiden äußeren Spalten auf Gleichheit(links, oben, rechts)
					}
					else if (i === this.getMatrix().length - 1 && (j < this.getMatrix()[i].length - 1 && j > 0) && ((this.getMatrix()[i][j] === this.getMatrix()[i][j - 1]) || (this.getMatrix()[i][j] === this.getMatrix()[i - 1][j]) || (this.getMatrix()[i][j] === this.getMatrix()[i][j + 1]))) {
						return false;
					}
				}
			}
			return true;
		}

		moveRight() {
		//Variable "changed" zeigt, ob sich die Matrix geändert hat
			let changed = false;
			//Spalten durchlaufen
			for (let i = 0; i < this.getMatrix().length; i++) {
			//Array "alreadyJoinedTogether" merkt sich die Position im Array, die schon in diesem Zug addiert wurden
				let alreadyJoinedTogether = new Array(this.getSize());
				for (let k = 0; k < alreadyJoinedTogether.length; k++) {
					alreadyJoinedTogether[k] = false;
				}
				//Zeile durchlaufen
				for (let j = this.getMatrix()[i].length - 1; j >= 0; j--) {
				//Enthält die Tabellenzelle eine 0 springt die for-Schleife zur nächsten Tabellenzelle
					if (this.getMatrix()[i][j] !== 0) {
					//Die Zahl soweit wie möglich nach rechts schieben
						while (j < this.getMatrix()[i].length - 1 && this.getMatrix()[i][j + 1] === 0) {
							this.getMatrix()[i][j + 1] = this.getMatrix()[i][j];
							this.getMatrix()[i][j] = 0;
							changed = true;
							j++;
						}
						//Zahlen zusammenfügen, falls der Zahlenwert gleich ist
						if (j < this.getMatrix()[i].length - 1 && this.getMatrix()[i][j] === this.getMatrix()[i][j + 1] && !alreadyJoinedTogether[j] && !alreadyJoinedTogether[j + 1]) {
							this.getMatrix()[i][j + 1] = this.getMatrix()[i][j] + this.getMatrix()[i][j + 1];
							this.getMatrix()[i][j] = 0;
							this._addToScore(this.getMatrix()[i][j + 1]);
							changed = true;
							j++;
							alreadyJoinedTogether[j] = true;
						}
					}
				}
			}
			//neue Zahl hinzufügen, wenn eine Änderung vorgenommen wurde
			if (changed) {
				this._spawnNumber();
			}
			return changed;
		}

		moveLeft() {
			let changed = false;
			for (let i = 0; i < this.getMatrix().length; i++) {
				let alreadyJoinedTogether = new Array(this.getSize());
				for (let k = 0; k < alreadyJoinedTogether.length; k++) {
					alreadyJoinedTogether[k] = false;
				}
				for (let j = 0; j <= this.getMatrix()[i].length - 1; j++) {
					if (this.getMatrix()[i][j] !== 0) {
						while (j > 0 && this.getMatrix()[i][j - 1] === 0) {
							this.getMatrix()[i][j - 1] = this.getMatrix()[i][j];
							this.getMatrix()[i][j] = 0;
							changed = true;
							j--;
						}
						if (j > 0 && this.getMatrix()[i][j] === this.getMatrix()[i][j - 1] && !alreadyJoinedTogether[j] && !alreadyJoinedTogether[j + 1]) {
							this.getMatrix()[i][j - 1] = this.getMatrix()[i][j] + this.getMatrix()[i][j - 1];
							this.getMatrix()[i][j] = 0;
							this._addToScore(this.getMatrix()[i][j - 1]);
							changed = true;
							j--;
							alreadyJoinedTogether[j] = true;
						}
					}
				}
			}
			if (changed) {
				this._spawnNumber();
			}
			return changed;
		}

		moveUp() {
			let changed = false;
			for (let i = 0; i < this.getMatrix().length; i++) {
				let alreadyJoinedTogether = new Array(this.getSize());
				for (let k = 0; k < alreadyJoinedTogether.length; k++) {
					alreadyJoinedTogether[k] = false;
				}
				for (let j = 0; j <= this.getMatrix().length - 1; j++) {
					if (this.getMatrix()[j][i] !== 0) {
						while (j > 0 && this.getMatrix()[j - 1][i] === 0) {
							this.getMatrix()[j - 1][i] = this.getMatrix()[j][i];
							this.getMatrix()[j][i] = 0;
							changed = true;
							j--;
						}
						if (j > 0 && this.getMatrix()[j][i] === this.getMatrix()[j - 1][i] && !alreadyJoinedTogether[j] && !alreadyJoinedTogether[j + 1]) {
							this.getMatrix()[j - 1][i] = this.getMatrix()[j][i] + this.getMatrix()[j - 1][i];
							this.getMatrix()[j][i] = 0;
							this._addToScore(this.getMatrix()[j - 1][i]);
							j--;
							changed = true;
							alreadyJoinedTogether[j] = true;
						}
					}
				}
			}
			if (changed) {
				this._spawnNumber();
			}
			return changed;
		}

		moveDown() {
			let changed = false;
			for (let i = 0; i < this.getMatrix().length; i++) {
				let alreadyJoinedTogether = new Array(this.getSize());
				for (let k = 0; k < alreadyJoinedTogether.length; k++) {
					alreadyJoinedTogether[k] = false;
				}
				for (let j = this.getMatrix().length - 1; j >= 0; j--) {
					if (this.getMatrix()[j][i] !== 0) {
						while (j < this.getMatrix().length - 1 && this.getMatrix()[j + 1][i] === 0) {
							this.getMatrix()[j + 1][i] = this.getMatrix()[j][i];
							this.getMatrix()[j][i] = 0;
							changed = true;
							j++;
						}
						if (j < this.getMatrix().length - 1 && this.getMatrix()[j][i] === this.getMatrix()[j + 1][i] && !alreadyJoinedTogether[j] && !alreadyJoinedTogether[j + 1]) {
							this.getMatrix()[j + 1][i] = this.getMatrix()[j][i] + this.getMatrix()[j + 1][i];
							this.getMatrix()[j][i] = 0;
							this._addToScore(this.getMatrix()[j + 1][i]);
							j++;
							changed = true;
							alreadyJoinedTogether[j] = true;
						}
					}
				}
			}
			if (changed) {
				this._spawnNumber();
			}
			return changed;
		}
}
	return GameBoard2048;
});

