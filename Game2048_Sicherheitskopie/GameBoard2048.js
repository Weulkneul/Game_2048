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

		getNewNumbersArray() {
			return this._newNumbersArray;
		}

		_getRandomFreeCell() {
			let zahl = 0;
			//While-Schleife läuft solange bis eine Zahl zwischen 1 und Size² gefunden wurde, die eine leere Position im Array findet
			do {
				zahl = Math.floor(Math.random() * this._size * this._size) + 1;
			} while (this._matrix[this._getRow(zahl)][this._getColumn(zahl)] !== 0);
			return zahl;
		}

		_getRandomCellValue() {
			const CELLVALUEPROBABILITYSPAWNINGTWO = 0.9;
			const CELLVALUETWO = 2;
			const CELLVALUEFOUR = 4;
			return Math.random() < CELLVALUEPROBABILITYSPAWNINGTWO ? CELLVALUETWO : CELLVALUEFOUR;
		}

		_getRow(index) {
			return Math.ceil(index / this._size) - 1;
		}

		_getColumn(index) {
			return index % this._size === 0 ? this._size - 1 : (index % this._size) - 1;
		}

		constructor(size) {
			this._size = size;
			this._matrix = new Array(size);
			this._score = 0;
			this._newNumbersArray = [];
			//size x size Matrix mit Nullen befüllen
			for (let i = 0; i < size; i++) {
				this._matrix[i] = new Array(size);
				for (let j = 0; j < size; j++) {
					this._matrix[i][j] = 0;
				}
			}
			this._newNumbersArray.push(this._spawnNumber());
			this._newNumbersArray.push(this._spawnNumber());
		}

		printMatrix() {
			for (let i = 0; i < this._size; i++) {
				console.log(this._matrix[i]);
			}
			console.log("\n");
		}

		_addToScore(points) {
			this._score += points;
		}

		_spawnNumber() {
			let zahl = this._getRandomFreeCell();
			this._matrix[this._getRow(zahl)][this._getColumn(zahl)] = this._getRandomCellValue();
			return zahl;
		}

		checkGameOver() {
			for (let i = 0; i < this._matrix.length; i++) {
				for (let j = 0; j < this._matrix[i].length; j++) {
					//Überprüft eine leere Stelle vorkommt -> Nicht zu Ende
					if (this._matrix[i][j] === 0) {
						return false;
					//Überprüft die Nachbarn erste Zeile außer die beiden äußeren Spalten auf Gleichheit(links, unten, rechts)
					}
					else if (i === 0 && (j < this._matrix[i].length - 1 && j > 0) && ((this._matrix[i][j] === this._matrix[i][j - 1]) || (this._matrix[i][j] === this._matrix[i + 1][j]) || (this._matrix[i][j] === this._matrix[i][j + 1]))) {
						return false;
					//Überprüft die Nachbarn alles außer erste und zweite Zeile nur für die erste und letzte Spalte auf Gleichheit(oben, unten)
					}
					else if ((i > 0 && i < this._matrix.length - 1) && (j === 0 || j === this._matrix[i].length - 1) && ((this._matrix[i][j] === this._matrix[i - 1][j]) || (this._matrix[i][j] === this._matrix[i + 1][j]))) {
						return false;
					//Überprüft die Nachbarn alles außer erste und zweite Zeile für die anderen Spalten auf Gleichheit(links, unten, oben, rechts)
					}
					else if ((i > 0 && i < this._matrix.length - 1) && (j > 0 && j < this._matrix[i].length - 1) && ((this._matrix[i][j] === this._matrix[i][j - 1]) || (this._matrix[i][j] === this._matrix[i - 1][j]) || (this._matrix[i][j] === this._matrix[i + 1][j]) || (this._matrix[i][j] === this._matrix[i][j + 1]))) {
						return false;
					//Überprüft die Nachbarn letzte Zeile außer die beiden äußeren Spalten auf Gleichheit(links, oben, rechts)
					}
					else if (i === this._matrix.length - 1 && (j < this._matrix[i].length - 1 && j > 0) && ((this._matrix[i][j] === this._matrix[i][j - 1]) || (this._matrix[i][j] === this._matrix[i - 1][j]) || (this._matrix[i][j] === this._matrix[i][j + 1]))) {
						return false;
					}
				}
			}
			return true;
		}

		moveRight() {
		//Variable "changed" zeigt, ob sich die Matrix geändert hat
			let changed = false;
			//Alle "neuen" Zahlen in einem Array merken
			this._newNumbersArray.length = 0;
			//Spalten durchlaufen
			for (let i = 0; i < this._matrix.length; i++) {
			//Array "alreadyJoinedTogether" merkt sich die Position im Array, die schon in diesem Zug addiert wurden
				let alreadyJoinedTogether = new Array(this._size);
				for (let k = 0; k < alreadyJoinedTogether.length; k++) {
					alreadyJoinedTogether[k] = false;
				}
				//Zeile durchlaufen
				for (let j = this._matrix[i].length - 1; j >= 0; j--) {
				//Enthält die Tabellenzelle eine 0 springt die for-Schleife zur nächsten Tabellenzelle
					if (this._matrix[i][j] !== 0) {
					//Die Zahl soweit wie möglich nach rechts schieben
						while (j < this._matrix[i].length - 1 && this._matrix[i][j + 1] === 0) {
							this._matrix[i][j + 1] = this._matrix[i][j];
							this._matrix[i][j] = 0;
							changed = true;
							j++;
						}
						//Zahlen zusammenfügen, falls der Zahlenwert gleich ist
						if (j < this._matrix[i].length - 1 && this._matrix[i][j] === this._matrix[i][j + 1] && !alreadyJoinedTogether[j] && !alreadyJoinedTogether[j + 1]) {
							this._matrix[i][j + 1] = this._matrix[i][j] + this._matrix[i][j + 1];
							this._matrix[i][j] = 0;
							this._addToScore(this._matrix[i][j + 1]);
							this._newNumbersArray.push((i * this._size) + j + 2);
							changed = true;
							j++;
							alreadyJoinedTogether[j] = true;
						}
					}
				}
			}
			//neue Zahl hinzufügen, wenn eine Änderung vorgenommen wurde
			if (changed) {
				this._newNumbersArray.push(this._spawnNumber());
			}
		}

		moveLeft() {
			let changed = false;
			this._newNumbersArray.length = 0;
			for (let i = 0; i < this._matrix.length; i++) {
				let alreadyJoinedTogether = new Array(this._size);
				for (let k = 0; k < alreadyJoinedTogether.length; k++) {
					alreadyJoinedTogether[k] = false;
				}
				for (let j = 0; j <= this._matrix[i].length - 1; j++) {
					if (this._matrix[i][j] !== 0) {
						while (j > 0 && this._matrix[i][j - 1] === 0) {
							this._matrix[i][j - 1] = this._matrix[i][j];
							this._matrix[i][j] = 0;
							changed = true;
							j--;
						}
						if (j > 0 && this._matrix[i][j] === this._matrix[i][j - 1] && !alreadyJoinedTogether[j] && !alreadyJoinedTogether[j - 1]) {
							this._matrix[i][j - 1] = this._matrix[i][j] + this._matrix[i][j - 1];
							this._matrix[i][j] = 0;
							this._addToScore(this._matrix[i][j - 1]);
							this._newNumbersArray.push((i * this._size) + j);
							changed = true;
							j--;
							alreadyJoinedTogether[j] = true;
						}
					}
				}
			}
			if (changed) {
				this._newNumbersArray.push(this._spawnNumber());
			}
		}

		moveUp() {
			let changed = false;
			this._newNumbersArray.length = 0;
			for (let j = 0; j < this._matrix.length; j++) {
				let alreadyJoinedTogether = new Array(this._size);
				for (let k = 0; k < alreadyJoinedTogether.length; k++) {
					alreadyJoinedTogether[k] = false;
				}
				for (let i = 0; i <= this._matrix.length - 1; i++) {
					if (this._matrix[i][j] !== 0) {
						while (i > 0 && this._matrix[i - 1][j] === 0) {
							this._matrix[i - 1][j] = this._matrix[i][j];
							this._matrix[i][j] = 0;
							changed = true;
							i--;
						}
						if (i > 0 && this._matrix[i][j] === this._matrix[i - 1][j] && !alreadyJoinedTogether[i] && !alreadyJoinedTogether[i - 1]) {
							this._matrix[i - 1][j] = this._matrix[i][j] + this._matrix[i - 1][j];
							this._matrix[i][j] = 0;
							this._addToScore(this._matrix[i - 1][j]);
							this._newNumbersArray.push(((i - 1) * this._size) + (j + 1));
							i--;
							changed = true;
							alreadyJoinedTogether[i] = true;
						}
					}
				}
			}
			if (changed) {
				this._newNumbersArray.push(this._spawnNumber());
			}
		}

		moveDown() {
			let changed = false;
			this._newNumbersArray.length = 0;
			for (let j = 0; j < this._matrix.length; j++) {
				let alreadyJoinedTogether = new Array(this._size);
				for (let k = 0; k < alreadyJoinedTogether.length; k++) {
					alreadyJoinedTogether[k] = false;
				}
				for (let i = this._matrix.length - 1; i >= 0; i--) {
					if (this._matrix[i][j] !== 0) {
						while (i < this._matrix.length - 1 && this._matrix[i + 1][j] === 0) {
							this._matrix[i + 1][j] = this._matrix[i][j];
							this._matrix[i][j] = 0;
							changed = true;
							i++;
						}
						if (i < this._matrix.length - 1 && this._matrix[i][j] === this._matrix[i + 1][j] && !alreadyJoinedTogether[i] && !alreadyJoinedTogether[i + 1]) {
							this._matrix[i + 1][j] = this._matrix[i][j] + this._matrix[i + 1][j];
							this._matrix[i][j] = 0;
							this._addToScore(this._matrix[i + 1][j]);
							this._newNumbersArray.push(((i + 1) * this._size) + (j + 1));
							i++;
							changed = true;
							alreadyJoinedTogether[i] = true;
						}
					}
				}
			}
			if (changed) {
				this._newNumbersArray.push(this._spawnNumber());
			}
		}
}
	return GameBoard2048;
});

