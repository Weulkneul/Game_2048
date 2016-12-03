"use strict";

define("HtmlRenderer2048", [],
	function () {
		class HtmlRenderer2048 {
			constructor(board, game) {
				this._board = board;
				this._game = game;
			}

			// Erstellt HTML "div" Elemente, welche die Tiles repräsentieren
			createGameBoard() {
				let gameboard = document.getElementById("board");
				// löscht alle Divs, wenn das Spiel zurückgesetzt wird
				while (gameboard.firstChild) {
					gameboard.removeChild(gameboard.firstChild);
				}
				for (let i = 0; i < this._board.getTiles().length; i++) {
					for (let j = 0; j < this._board.getTiles()[i].length; j++) {
						let newDivRepresentingTile = document.createElement("div");
						const POSITIONFACTOR = gameboard.offsetWidth / this._board.getSize();
						// Höhe und Breite abhängig von der Größe des Gameboards und der Anzahl der Tiles pro Zeile
						newDivRepresentingTile.style.width = (gameboard.offsetWidth / this._board.getSize()) + "px";
						newDivRepresentingTile.style.height = (gameboard.offsetHeight / this._board.getSize()) + "px";
						// Div vertikal zentrieren
						newDivRepresentingTile.style.lineHeight = (gameboard.offsetHeight / this._board.getSize()) + "px";
						// Synchronisation von Div zu Tile
						newDivRepresentingTile.id = "cell" + this._board.getTiles()[i][j].getId();
						if (this._board.getNewNumbersArray().includes((i * this._board.getSize()) + (j + 1))) {
							// Animation der neuen Zahlen
							newDivRepresentingTile.className = "spawn";
						}
						// Hintergrundfarbe dem Value der Tiles entsprenchend setzen
						newDivRepresentingTile.className += " number" + this._board.getTiles()[i][j].getValue();
						// Zahl als Inhalt anzeigen
						newDivRepresentingTile.textContent = this._board.getTiles()[i][j].getValue() || "";
						// Innerhalb des Gameboards positionieren
						newDivRepresentingTile.style.top = (i * POSITIONFACTOR) + "px";
						newDivRepresentingTile.style.left = (j * POSITIONFACTOR) + "px";
						// Zum Spielfeld hinzufügen
						gameboard.appendChild(newDivRepresentingTile);
					}
				}
				document.getElementById("score").textContent = "Score: " + this._board.getScore();
			}

			refreshBoardAndScore(oldTiles, newTiles) {
				let tilesToAnimateArray = [];
				for (let i = 0; i < newTiles.length; i++) {
					for (let j = 0; j < newTiles[i].length; j++) {
						// Alle neuen Tiles, die einen Verweis auf alte Tiles, welche ineinander geschoben wurden, finden
						if (newTiles[i][j].getCombinedTiles().length !== 0) {
							for (let l = 0; l < oldTiles.length; l++) {
								for (let m = 0; m < oldTiles[l].length; m++) {
									if (oldTiles[l][m]._id === newTiles[i][j].getCombinedTiles()[0] || oldTiles[l][m]._id === newTiles[i][j].getCombinedTiles()[1]) {
										// Ineinander geschobene und neu entstandene Tiles abspeichern
										tilesToAnimateArray.push({ old: oldTiles[l][m], new: newTiles[i][j] });
									}
								}
							}
						}
					}
				}
				// Animieren, wie die ineiander geschobenen Tiles sich übereinander schieben
				for (let i = 0; i < tilesToAnimateArray.length; i++) {
					this._animate(tilesToAnimateArray[i].old._id, tilesToAnimateArray[i].old._position.x - tilesToAnimateArray[i].new._position.x, tilesToAnimateArray[i].old._position.y - tilesToAnimateArray[i].new._position.y);
				}

				// Alle als verschoben markierte Tiles(Moved-Attribut auf true gesetzt) animieren
				for (let i = 0; i < newTiles.length; i++) {
					for (let j = 0; j < newTiles[i].length; j++) {
						if (newTiles[i][j].getMoved()) {
							for (let l = 0; l < oldTiles.length; l++) {
								for (let m = 0; m < oldTiles[l].length; m++) {
									if (newTiles[i][j].getId() === oldTiles[l][m]._id) {
										this._animate(oldTiles[l][m]._id, oldTiles[l][m]._position.x - newTiles[i][j]._position.x, oldTiles[l][m]._position.y - newTiles[i][j]._position.y);
									}
								}
							}
						}
					}
				}
			}
			// Neue Tiles erstellen, alte Tiles(ineinander geschobene Tiles) löschen, Werte und Positionen überarbeiten
			_spawnNewNumbers() {
				let gameboard = document.getElementById("board");
				const POSITIONFACTOR = gameboard.offsetWidth / this._board.getSize();
				for (let j = 0; j < this._board.getTiles().length; j++) {
					for (let k = 0; k < this._board.getTiles()[j].length; k++) {
						if (document.getElementById("cell" + this._board.getTiles()[j][k].getId()) === null) {
							// Tiles existieren die keinem Div zugeordnet sind -> neue Divs erstellen und synchronisieren
							let newdivTile = document.createElement("div");
							newdivTile.style.width = (gameboard.offsetWidth / this._board.getSize()) + "px";
							newdivTile.style.height = (gameboard.offsetHeight / this._board.getSize()) + "px";
							newdivTile.style.lineHeight = (gameboard.offsetHeight / this._board.getSize()) + "px";
							newdivTile.id = "cell" + this._board.getTiles()[j][k].getId();
							gameboard.appendChild(newdivTile);
							//Löschen der alten Tiles
							for (let tiles in this._board.getTiles()[j][k].getCombinedTiles()) {
								let cellToDelete = document.getElementById("cell" + this._board.getTiles()[j][k].getCombinedTiles()[tiles]);
								if (!cellToDelete) {
									return;
								}
								cellToDelete.parentNode.removeChild(cellToDelete);
							}
						}
						// Positionen der Divs und Tiles abgleichen
						document.getElementById("cell" + this._board.getTiles()[j][k].getId()).textContent = this._board.getTiles()[j][k].getValue() || "";
						document.getElementById("cell" + this._board.getTiles()[j][k].getId()).className = " number" + this._board.getTiles()[j][k].getValue();
						document.getElementById("cell" + this._board.getTiles()[j][k].getId()).style.top = (this._board.getTiles()[j][k].getPosition().y * POSITIONFACTOR) + "px";
						document.getElementById("cell" + this._board.getTiles()[j][k].getId()).style.left = (this._board.getTiles()[j][k].getPosition().x * POSITIONFACTOR) + "px";
						if (this._board.getNewNumbersArray().includes((j * this._board.getSize()) + (k + 1))) {
							document.getElementById("cell" + this._board.getTiles()[j][k].getId()).className += " spawn";
						}
					}
				}
				this._board.resetCombinedTiles();
				document.getElementById("score").textContent = "Score: " + this._board.getScore();
			}

			_animate(tile, xDifference, yDifference) {
				let cell = document.getElementById("cell" + tile);
				if (!cell) {
					return;
				}
				// Position der Div bestimmen
				let topPosition = cell.style.top;
				topPosition = parseInt(topPosition.replace("px", ""));
				let leftPosition = cell.style.left;
				leftPosition = parseInt(leftPosition.replace("px", ""));
				let position = 0;
				const POSITIONFACTOR = document.getElementById("board").offsetWidth / this._board.getSize();
				// Feststellen ob in x oder y Richtung verschoben wurde, Position der alten Tiles als Startwert festlegen
				if (xDifference !== 0) {
					position = leftPosition;
				}
				else {
					position = topPosition;
				}
				const TIMEOUT = 12;
				let time = 0;
				// Delay der Verschiebungen abstimmen, dass alle Tiles gleichzeitig ankommen
				if (xDifference === 1 || xDifference === -1 || yDifference === 1 || yDifference === -1) {
					time = TIMEOUT;
				}
				else if (xDifference === 2 || xDifference === -2 || yDifference === 2 || yDifference === -2) {
					time = TIMEOUT / 2;
				}
				else if (xDifference === 3 || xDifference === -3 || yDifference === 3 || yDifference === -3) {
					time = TIMEOUT / 3;
				}
				let id = setInterval(frame.bind(this), time);
				function frame() {
					if (!cell) {
						return;
					}

					if (xDifference < 0) {
						// Abbruchkriterium, falls die neue Position erreicht wurde
						if (position >= leftPosition - (xDifference * POSITIONFACTOR)) {
							clearInterval(id);
							this._spawnNewNumbers();
						}
						else {
							// Div um 10 Pixel nach Rechts verschieben
							position += 10;
							cell.style.top = topPosition + "px";
							cell.style.left = position + "px";
						}
					}
					if (xDifference > 0) {
						// Abbruchkriterium, falls die neue Position erreicht wurde
						if (position <= leftPosition - (xDifference * POSITIONFACTOR)) {
							clearInterval(id);
							this._spawnNewNumbers();
						}
						else {
							// Div um 10 Pixel nach Links verschieben
							position -= 10;
							cell.style.top = topPosition + "px";
							cell.style.left = position + "px";
						}
					}
					if (yDifference < 0) {
						// Abbruchkriterium, falls die neue Position erreicht wurde
						if (position >= topPosition - (yDifference * POSITIONFACTOR)) {
							clearInterval(id);
							this._spawnNewNumbers();
						}
						else {
							// Div um 10 Pixel nach Unten verschieben
							position += 10;
							cell.style.top = position + "px";
							cell.style.left = leftPosition + "px";
						}
					}
					if (yDifference > 0) {
						// Abbruchkriterium, falls die neue Position erreicht wurde
						if (position <= topPosition - (yDifference * POSITIONFACTOR)) {
							clearInterval(id);
							this._spawnNewNumbers();
						}
						else {
							// Div um 10 Pixel nach Oben verschieben
							position -= 10;
							cell.style.top = position + "px";
							cell.style.left = leftPosition + "px";
						}
					}
				}
			}

			placeRestartButton() {
				document.getElementById("restartButton").style.visibility = "visible";
				document.getElementById("score").style.fontWeight = "bold";
				document.getElementById("restartButton").onclick = this._resetGameBoard.bind(this);
			}

			_resetGameBoard() {
				document.getElementById("restartButton").style.visibility = "hidden";
				document.getElementById("score").style.fontWeight = "normal";
				this._game.resetGame(this._board.getSize());
			}

		}
		return HtmlRenderer2048;
	});
