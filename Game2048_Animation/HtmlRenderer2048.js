"use strict";

define("HtmlRenderer2048", [],
	function () {
		class HtmlRenderer2048 {
			constructor(board, game) {
				this._board = board;
				this._game = game;
			}

			createGameBoard() {
				let gameboard = document.getElementById("board");

				for (let i = 0; i < this._board.getTiles().length; i++) {
					for (let j = 0; j < this._board.getTiles()[i].length; j++) {
						let divTile = document.createElement("div");
						const POSITIONFACTOR = gameboard.offsetWidth / this._board.getSize();
						divTile.style.width = (gameboard.offsetWidth / this._board.getSize()) + "px";
						divTile.style.height = (gameboard.offsetHeight / this._board.getSize()) + "px";
						divTile.style.lineHeight = (gameboard.offsetHeight / this._board.getSize()) + "px";
						divTile.id = "cell" + this._board.getTiles()[i][j].getId();
						if (this._board.getNewNumbersArray().includes((i * this._board.getSize()) + (j + 1))) {
							divTile.className = "spawn";
						}
						divTile.className += " number" + this._board.getTiles()[i][j].getValue();
						divTile.textContent = this._board.getTiles()[i][j].getValue() || "";
						divTile.style.top = (i * POSITIONFACTOR) + "px";
						divTile.style.left = (j * POSITIONFACTOR) + "px";
						gameboard.appendChild(divTile);
					}
				}
				document.getElementById("score").innerHTML = "Score: " + this._board.getScore();
			}

			refreshBoardAndScore(oldTiles, newTiles) {
				let tilesToAnimateArray = [];
				for (let i = 0; i < newTiles.length; i++) {
					for (let j = 0; j < newTiles[i].length; j++) {
						if (newTiles[i][j].getCombinedTiles().length !== 0) {
							for (let l = 0; l < oldTiles.length; l++) {
								for (let m = 0; m < oldTiles[l].length; m++) {
									if (oldTiles[l][m]._id === newTiles[i][j].getCombinedTiles()[0] || oldTiles[l][m]._id === newTiles[i][j].getCombinedTiles()[1]) {
										tilesToAnimateArray.push({ old: oldTiles[l][m], new: newTiles[i][j] });
									}
								}
							}
						}
					}
				}

				for (let i = 0; i < tilesToAnimateArray.length; i++) {
					this._animate(tilesToAnimateArray[i].old._id, tilesToAnimateArray[i].old._position.x - tilesToAnimateArray[i].new._position.x, tilesToAnimateArray[i].old._position.y - tilesToAnimateArray[i].new._position.y);
				}

				for (let i = 0; i < newTiles.length; i++) {
					for (let j = 0; j < newTiles[i].length; j++) {
						if (newTiles[i][j]._moved) {
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

			_spawnNewNumbers() {
				const POSITIONFACTOR = document.getElementById("board").offsetWidth / this._board.getSize();
				for (let j = 0; j < this._board.getTiles().length; j++) {
					for (let k = 0; k < this._board.getTiles()[j].length; k++) {
						if (document.getElementById("cell" + this._board.getTiles()[j][k].getId()) === null) {
							let newdivTile = document.createElement("div");
							newdivTile.style.width = (document.getElementById("board").offsetWidth / this._board.getSize()) + "px";
							newdivTile.style.height = (document.getElementById("board").offsetHeight / this._board.getSize()) + "px";
							newdivTile.style.lineHeight = (document.getElementById("board").offsetHeight / this._board.getSize()) + "px";
							newdivTile.id = "cell" + this._board.getTiles()[j][k].getId();
							document.getElementById("board").appendChild(newdivTile);
							//Löschen der alten Tiles
							for (let tiles in this._board.getTiles()[j][k].getCombinedTiles()) {
								document.getElementById("cell" + this._board.getTiles()[j][k].getCombinedTiles()[tiles]).parentNode.removeChild(document.getElementById("cell" + this._board.getTiles()[j][k].getCombinedTiles()[tiles]));
							}
						}
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
			}

			_animate(tile, xMovement, yMovement) {
				let topPosition = document.getElementById("cell" + tile).style.top;
				topPosition = parseInt(topPosition.replace("px", ""));
				let leftPosition = document.getElementById("cell" + tile).style.left;
				leftPosition = parseInt(leftPosition.replace("px", ""));
				let position = 0;
				const POSITIONFACTOR = document.getElementById("board").offsetWidth / this._board.getSize();
				if (xMovement !== 0) {
					position = leftPosition;
				}
				else {
					position = topPosition;
				}
				const TIMEOUT = 1;
				let id = setInterval(frame.bind(this), TIMEOUT);
				function frame() {
					if (xMovement < 0) {
						if (position === leftPosition - (xMovement * POSITIONFACTOR)) {
							clearInterval(id);
							this._spawnNewNumbers();
						}
						else {
							position++;
							document.getElementById("cell" + tile).style.top = topPosition + "px";
							document.getElementById("cell" + tile).style.left = position + "px";
						}
					}
					if (xMovement > 0) {
						if (position === leftPosition - (xMovement * POSITIONFACTOR)) {
							clearInterval(id);
							this._spawnNewNumbers();
						}
						else {
							position--;
							document.getElementById("cell" + tile).style.top = topPosition + "px";
							document.getElementById("cell" + tile).style.left = position + "px";
						}
					}
					if (yMovement < 0) {
						if (position === topPosition - (yMovement * POSITIONFACTOR)) {
							clearInterval(id);
							this._spawnNewNumbers();
						}
						else {
							position++;
							document.getElementById("cell" + tile).style.top = position + "px";
							document.getElementById("cell" + tile).style.left = leftPosition + "px";
						}
					}
					if (yMovement > 0) {
						if (position === topPosition - (yMovement * POSITIONFACTOR)) {
							clearInterval(id);
							this._spawnNewNumbers();
						}
						else {
							position--;
							document.getElementById("cell" + tile).style.top = position + "px";
							document.getElementById("cell" + tile).style.left = leftPosition + "px";
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
