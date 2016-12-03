"user strict";

define("GameBoard2048", ["Tile"],
function (Tile) {
	class GameBoard2048 {
		getTiles() {
			return this._tiles;
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
			let randomNumberOneToSixteen = 0;
			//While-Schleife läuft solange bis eine Zahl zwischen 1 und Size² gefunden wurde, die ein Tile im Array findet, welches einen Value von 0 aufweist
			do {
				randomNumberOneToSixteen = Math.floor(Math.random() * this._size * this._size) + 1;
			} while (this._tiles[this._getRow(randomNumberOneToSixteen)][this._getColumn(randomNumberOneToSixteen)].getValue() !== 0);
			return randomNumberOneToSixteen;
		}

		_getRandomCellValue() {
			// 90% eine 2 zu spawnen, 10% für eine 4
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
			this._tiles = new Array(size);
			this._score = 0;
			this._newNumbersArray = [];
			const TILESDEFAULTVALUE = 0;

			//size x size Tiles mit Nullen befüllen
			for (let i = 0; i < size; i++) {
				this._tiles[i] = new Array(size);
				for (let j = 0; j < size; j++) {
					this._tiles[i][j] = new Tile(TILESDEFAULTVALUE, [], { x: j, y: i });
				}
			}
			this._newNumbersArray.push(this._spawnNumber());
			this._newNumbersArray.push(this._spawnNumber());
		}

		// Nach jedem Zug müssen die Verweise auf die ineinander verschobenen Tiles resetet werden
		resetCombinedTiles() {
			for (let i = 0; i < this._tiles.length; i++) {
				for (let j = 0; j < this._tiles[i].length; j++) {
					this._tiles[i][j].setCombinedTiles([]);
				}
			}
		}
		_addToScore(points) {
			this._score += points;
		}

		_spawnNumber() {
			let randomNumber = this._getRandomFreeCell();
			this._tiles[this._getRow(randomNumber)][this._getColumn(randomNumber)].setValue(this._getRandomCellValue());
			return randomNumber;
		}

		checkGameOver() {
			for (let i = 0; i < this._tiles.length; i++) {
				for (let j = 0; j < this._tiles[i].length; j++) {
					//Überprüft eine leere Stelle vorkommt -> Nicht zu Ende
					if (this._tiles[i][j].getValue() === 0) {
						return false;
					//Überprüft die Nachbarn in der ersten Zeile, außer die beiden äußeren Spalten, auf Gleichheit(links, unten, rechts)
					}
					else if (i === 0 && (j < this._tiles[i].length - 1 && j > 0) && ((this._tiles[i][j].getValue() === this._tiles[i][j - 1].getValue()) || (this._tiles[i][j].getValue() === this._tiles[i + 1][j].getValue()) || (this._tiles[i][j].getValue() === this._tiles[i][j + 1].getValue()))) {
						return false;
					//Überprüft die Nachbarn, alles außer erste und letzte Zeile, nur für die erste und letzte Spalte auf Gleichheit(oben, unten)
					}
					else if ((i > 0 && i < this._tiles.length - 1) && (j === 0 || j === this._tiles[i].length - 1) && ((this._tiles[i][j].getValue() === this._tiles[i - 1][j].getValue()) || (this._tiles[i][j].getValue() === this._tiles[i + 1][j].getValue()))) {
						return false;
					//Überprüft die Nachbarn, alles außer erste und letzte Zeile, für die verbleibenen Spalten auf Gleichheit(links, unten, oben, rechts)
					}
					else if ((i > 0 && i < this._tiles.length - 1) && (j > 0 && j < this._tiles[i].length - 1) && ((this._tiles[i][j].getValue() === this._tiles[i][j - 1].getValue()) || (this._tiles[i][j].getValue() === this._tiles[i - 1][j].getValue()) || (this._tiles[i][j].getValue() === this._tiles[i + 1][j].getValue()) || (this._tiles[i][j].getValue() === this._tiles[i][j + 1].getValue()))) {
						return false;
					//Überprüft die Nachbarn letzte Zeile, außer die beiden äußeren Spalten auf Gleichheit(links, oben, rechts)
					}
					else if (i === this._tiles.length - 1 && (j < this._tiles[i].length - 1 && j > 0) && ((this._tiles[i][j].getValue() === this._tiles[i][j - 1].getValue()) || (this._tiles[i][j].getValue() === this._tiles[i - 1][j].getValue()) || (this._tiles[i][j].getValue() === this._tiles[i][j + 1].getValue()))) {
						return false;
					}
				}
			}
			return true;
		}

		moveRight() {
		//Variable "changed" zeigt, ob sich die Matrix geändert hat
			let changed = false;
			//Alle "neuen" Zahlen in einem Array merken, um diese animieren zu können
			this._newNumbersArray = [];
			//Spalten durchlaufen
			for (let i = 0; i < this._tiles.length; i++) {
			//Array "alreadyJoinedTogether" merkt sich die Position im Array, die schon in diesem Zug addiert wurden
				let alreadyJoinedTogether = new Array(this._size);
				for (let k = 0; k < alreadyJoinedTogether.length; k++) {
					alreadyJoinedTogether[k] = false;
				}
				//Zeile durchlaufen
				for (let j = this._tiles[i].length - 1; j >= 0; j--) {
				//Enthält die Tabellenzelle eine 0 springt die for-Schleife zur nächsten Tabellenzelle
					if (this._tiles[i][j].getValue() !== 0) {
					//Die Zahl soweit wie möglich nach rechts schieben
						while (j < this._tiles[i].length - 1 && this._tiles[i][j + 1].getValue() === 0) {
							//Tiles miteinander tauschen und Positionen abändern
							[this._tiles[i][j + 1], this._tiles[i][j]] = [this._tiles[i][j], this._tiles[i][j + 1]];
							this._tiles[i][j + 1].changePosition("right");
							this._tiles[i][j].changePosition("left");
							this._tiles[i][j + 1].moved();
							changed = true;
							j++;
						}
						//Tiles zusammenfügen, falls die Values gleich sind und die Zahlen nicht schon in diesem Zug schon ineinander geschoben wurden
						if (j < this._tiles[i].length - 1 && this._tiles[i][j].getValue() === this._tiles[i][j + 1].getValue() && !alreadyJoinedTogether[j] && !alreadyJoinedTogether[j + 1]) {
							// Id's der ineinander geschobenen Tiles abspeichern
							let combinedTiles = new Array();
							combinedTiles.push(this._tiles[i][j].getId());
							combinedTiles.push(this._tiles[i][j + 1].getId());

							// Zwei neue Tiles erstellen: zusammengefügtes Tile und das vorherige Tile reseten
							this._tiles[i][j + 1] = new Tile(this._tiles[i][j].getValue() + this._tiles[i][j + 1].getValue(), combinedTiles, this._tiles[i][j + 1].getPosition());
							this._tiles[i][j] = new Tile(0, [], this._tiles[i][j].getPosition());

							this._addToScore(this._tiles[i][j + 1].getValue());
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
			// Siehe moveRight() -> einzige Änderung in der Richtung zum Durchlaufen des Arrays
			let changed = false;
			this._newNumbersArray = [];
			for (let i = 0; i < this._tiles.length; i++) {
				let alreadyJoinedTogether = new Array(this._size);
				for (let k = 0; k < alreadyJoinedTogether.length; k++) {
					alreadyJoinedTogether[k] = false;
				}
				for (let j = 0; j <= this._tiles[i].length - 1; j++) {
					if (this._tiles[i][j].getValue() !== 0) {
						while (j > 0 && this._tiles[i][j - 1].getValue() === 0) {
							[this._tiles[i][j - 1], this._tiles[i][j]] = [this._tiles[i][j], this._tiles[i][j - 1]];
							this._tiles[i][j - 1].changePosition("left");
							this._tiles[i][j].changePosition("right");
							this._tiles[i][j - 1].moved();
							changed = true;
							j--;
						}
						if (j > 0 && this._tiles[i][j].getValue() === this._tiles[i][j - 1].getValue() && !alreadyJoinedTogether[j] && !alreadyJoinedTogether[j - 1]) {
							let combinedTiles = new Array();
							combinedTiles.push(this._tiles[i][j].getId());
							combinedTiles.push(this._tiles[i][j - 1].getId());

							this._tiles[i][j - 1] = new Tile(this._tiles[i][j].getValue() + this._tiles[i][j - 1].getValue(), combinedTiles, this._tiles[i][j - 1].getPosition());
							this._tiles[i][j] = new Tile(0, [], this._tiles[i][j].getPosition());

							this._addToScore(this._tiles[i][j - 1].getValue());
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
			// Siehe moveRight() -> einzige Änderung in der Richtung zum Durchlaufen des Arrays
			let changed = false;
			this._newNumbersArray = [];
			for (let j = 0; j < this._tiles.length; j++) {
				let alreadyJoinedTogether = new Array(this._size);
				for (let k = 0; k < alreadyJoinedTogether.length; k++) {
					alreadyJoinedTogether[k] = false;
				}
				for (let i = 0; i <= this._tiles.length - 1; i++) {
					if (this._tiles[i][j].getValue() !== 0) {
						while (i > 0 && this._tiles[i - 1][j].getValue() === 0) {
							[this._tiles[i - 1][j], this._tiles[i][j]] = [this._tiles[i][j], this._tiles[i - 1][j]];
							this._tiles[i - 1][j].changePosition("up");
							this._tiles[i][j].changePosition("down");
							this._tiles[i - 1][j].moved();
							changed = true;
							i--;
						}
						if (i > 0 && this._tiles[i][j].getValue() === this._tiles[i - 1][j].getValue() && !alreadyJoinedTogether[i] && !alreadyJoinedTogether[i - 1]) {
							let combinedTiles = new Array();
							combinedTiles.push(this._tiles[i][j].getId());
							combinedTiles.push(this._tiles[i - 1][j].getId());

							this._tiles[i - 1][j] = new Tile(this._tiles[i][j].getValue() + this._tiles[i - 1][j].getValue(), combinedTiles, this._tiles[i - 1][j].getPosition());
							this._tiles[i][j] = new Tile(0, [], this._tiles[i][j].getPosition());
							this._addToScore(this._tiles[i - 1][j].getValue());
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
			// Siehe moveRight() -> einzige Änderung in der Richtung zum Durchlaufen des Arrays
			let changed = false;
			this._newNumbersArray = [];
			for (let j = 0; j < this._tiles.length; j++) {
				let alreadyJoinedTogether = new Array(this._size);
				for (let k = 0; k < alreadyJoinedTogether.length; k++) {
					alreadyJoinedTogether[k] = false;
				}
				for (let i = this._tiles.length - 1; i >= 0; i--) {
					if (this._tiles[i][j].getValue() !== 0) {
						while (i < this._tiles.length - 1 && this._tiles[i + 1][j].getValue() === 0) {
							[this._tiles[i + 1][j], this._tiles[i][j]] = [this._tiles[i][j], this._tiles[i + 1][j]];
							this._tiles[i + 1][j].changePosition("down");
							this._tiles[i][j].changePosition("up");
							this._tiles[i + 1][j].moved();
							changed = true;
							i++;
						}
						if (i < this._tiles.length - 1 && this._tiles[i][j].getValue() === this._tiles[i + 1][j].getValue() && !alreadyJoinedTogether[i] && !alreadyJoinedTogether[i + 1]) {
							let combinedTiles = new Array();
							combinedTiles.push(this._tiles[i][j].getId());
							combinedTiles.push(this._tiles[i + 1][j].getId());

							this._tiles[i + 1][j] = new Tile(this._tiles[i][j].getValue() + this._tiles[i + 1][j].getValue(), combinedTiles, this._tiles[i + 1][j].getPosition());
							this._tiles[i][j] = new Tile(0, [], this._tiles[i][j].getPosition());
							this._addToScore(this._tiles[i + 1][j].getValue());
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

