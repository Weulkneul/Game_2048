"use strict";

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

	_setScore(score) {
		this._score = score;
	}

	_getRandomFreeCell() {
		let zahl = 0;
		do {
			zahl = Math.floor(Math.random() * this.getSize() * this.getSize()) + 1;
		} while (this.getMatrix()[this._getRow(zahl)][this._getColumn(zahl)] !== 0);
		return zahl;
	}

	_getRandomCellValue() {
		const cellValueProbability = 0.9;
		return Math.random() < cellValueProbability ? 2 : 4;
	}

	_getRow(index) {
		return Math.ceil(index / this.getSize()) - 1;
	}

	_getColumn(index) {
		return index % this.getSize() === 0 ? this.getSize() - 1 : (index % this.getSize()) - 1;
	}

	_spawnNumber() {
		let zahl = this._getRandomFreeCell();
		this.getMatrix()[this._getRow(zahl)][this._getColumn(zahl)] = this._getRandomCellValue();
	}

	constructor(size) {
		this._size = size;
		this._matrix = new Array(size);
		this._score = 0;

		for (let i = 0; i < size; i++) {
			this._matrix[i] = new Array(size);
			for (let j = 0; j < size; j++) {
				this._matrix[i][j] = 0;
			}
		}

		this._spawnNumber();
		this._spawnNumber();

		console.log("Initialize:");
	}

	printMatrix() {
		for (let i = 0; i < this.getSize(); i++) {
			console.log(this.getMatrix()[i]);
		}
		console.log("\n");
	}

	//Matrix als HTML-Tabelle in einem String zusammenfassen
	printTable() {
		let table = "<table>";
		for (let i = 0; i < this.getSize(); i++) {
			table += "<tr>";
			for (let j = 0; j < this.getSize(); j++) {
				table += "<td class='td" + this.getMatrix()[i][j] + "'>" + this.getMatrix()[i][j] + "</td>";
			}
			table += "</tr>";
		}
		table += "</table>";
		console.log(table);
		return table;
	}

	moveRight() {
		//Variable "changed" zeigt, ob sich die Matrix geändert hat
		let changed = false;
		//Spalten durchlaufen
		for (let i = 0; i < this.getMatrix().length; i++) {
			//Array "alreadyJoinedTogether" merkt sich die Zahlen, die schon in diesem Zug addiert wurden
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
						this._setScore(this.getScore() + this.getMatrix()[i][j+1]);
						changed = true;
						j++;
						alreadyJoinedTogether[j] = true;
					}
				}
			}
		}
		//neue Zahl hinzufügen, wenn eine Änderung vorgenommen wurde
		if (changed) {
			setTimeout(this._spawnNumber(), 1000);
		}
		console.log("Right:");
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
						this._setScore(this.getScore() + this.getMatrix()[i][j - 1]);
						changed = true;
						j--;
						alreadyJoinedTogether[j] = true;
					}
				}
			}
		}
		if (changed) {
			setTimeout(this._spawnNumber(), 1000);
		}
		console.log("Left:");
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
						this._setScore(this.getScore() + this.getMatrix()[j - 1][i]);
						j--;
						changed = true;
						alreadyJoinedTogether[j] = true;
					}
				}
			}
		}
		if (changed) {
			setTimeout(this._spawnNumber(), 1000);
		}
		console.log("Up:");
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
						this._setScore(this.getScore() + this.getMatrix()[j + 1][i]);
						j++;
						changed = true;
						alreadyJoinedTogether[j] = true;
					}
				}
			}
		}
		if (changed) {
			setTimeout(this._spawnNumber(), 1000);
		}
		console.log("Down:");
	}
}

