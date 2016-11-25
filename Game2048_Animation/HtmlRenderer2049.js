"use strict";

define("HtmlRenderer2049", [],
	function () {
		class HtmlRenderer2049 {
			constructor(board, game) {
				this._board = board;
				this._game = game;
			}

			createGameBoard() {
				let gameboard = document.getElementById("board");

				/*for (let i = 0; i < this._board.getSize(); i++) {
					let r1 = document.createElement("div");
					const BORDERWIDTH = 10;
					const POSITIONFACTOR = (gameboard.offsetWidth - (BORDERWIDTH * (this._board.getSize() + 1))) / this._board.getSize();
					r1.style.width = gameboard.offsetWidth + "px";
					r1.style.height = (gameboard.offsetHeight / this._board.getSize()) + "px";
					r1.style.border = BORDERWIDTH + "px solid black";
					r1.style.top = (i * POSITIONFACTOR) + "px";
					gameboard.appendChild(r1);
				}
				for (let i = 0; i < this._board.getSize(); i++) {
					let r1 = document.createElement("div");
					const BORDERWIDTH = 10;
					const POSITIONFACTOR = (gameboard.offsetWidth - (BORDERWIDTH * (this._board.getSize() + 1))) / this._board.getSize();
					r1.style.width = (gameboard.offsetWidth / this._board.getSize()) + "px";
					r1.style.height = gameboard.offsetHeight + "px";
					r1.style.border = BORDERWIDTH + "px solid black";
					r1.style.left = (i * POSITIONFACTOR) + "px";
					gameboard.appendChild(r1);
				}*/

				for (let i = 0; i < this._board.getTiles().length; i++) {
					for (let j = 0; j < this._board.getTiles()[i].length; j++) {
						let div1 = document.createElement("div");
						const POSITIONFACTOR = gameboard.offsetWidth / this._board.getSize();
						div1.style.width = (gameboard.offsetWidth / this._board.getSize()) + "px";
						div1.style.height = (gameboard.offsetHeight / this._board.getSize()) + "px";
						div1.style.lineHeight = (gameboard.offsetHeight / this._board.getSize()) + "px";
						div1.id = "cell" + ((i * this._board.getSize()) + (j + 1));
						if (this._board.getNewNumbersArray().includes((i * this._board.getSize()) + (j + 1))) {
							div1.className = "spawn";
						}
						div1.className += " number" + this._board.getTiles()[i][j].getValue();
						div1.textContent = this._board.getTiles()[i][j].getValue() || "";
						div1.style.top = (i * POSITIONFACTOR) + "px";
						div1.style.left = (j * POSITIONFACTOR) + "px";
						gameboard.appendChild(div1);
					}
				}
				document.getElementById("score").innerHTML = "Score: " + this._board.getScore();
			}

			_setNewValues() {
				//Spawn-Animation
				for (let j = 0; j < this._board.getSize(); j++) {
					for (let k = 0; k < this._board.getSize(); k++) {
						let classes = "";
						document.getElementById("cell" + ((j * this._board.getSize()) + (k + 1))).textContent = this._board.getTiles()[j][k].getValue() || "";
						if (this._board.getNewNumbersArray().includes((j * this._board.getSize()) + (k + 1))) {
							classes += " spawn";
						}
							//Farben setzen
						classes += " number" + this._board.getTiles()[j][k].getValue();
						document.getElementById("cell" + ((j * this._board.getSize()) + (k + 1))).className += classes;
					}
				}
				document.getElementById("score").innerHTML = "Score: " + this._board.getScore();
				this._board.resetMovesAndCombinedTiles();
			}

			refreshBoardAndScore(oldTiles, newTiles) {
				for (let j = 0; j < this._board.getSize(); j++) {
					for (let k = 0; k < this._board.getSize(); k++) {
						document.getElementById("cell" + ((j * this._board.getSize()) + (k + 1))).className = "";
					}
				}
				//Verschiebe-Animation
				let idsOld = [];
				let idsNew = [];
				for (let i = 0; i < this._board.getSize(); i++) {
					for (let j = 0; j < this._board.getSize(); j++) {
						idsOld.push(oldTiles[i][j]._id);
					}
				}

				for (let i = 0; i < this._board.getSize(); i++) {
					for (let j = 0; j < this._board.getSize(); j++) {
						idsNew.push(newTiles[i][j].getId());
					}
				}

				for (let i = 0; i < idsOld.length; i++) {
					//verschieben
					if (idsNew.includes(idsOld[i])) {
						for (let j = 0; j < this._board.getSize(); j++) {
							for (let k = 0; k < this._board.getSize(); k++) {
								if (newTiles[j][k].getId() === idsOld[i]) {
									for (let key in newTiles[j][k].getMoves()) {
										if (newTiles[j][k].getMoves().hasOwnProperty(key)) {
											if (newTiles[j][k].getMoves()[key] !== 0) {
												for (let l = 0; l < this._board.getSize(); l++) {
													for (let m = 0; m < this._board.getSize(); m++) {
														if (newTiles[j][k].getId() === oldTiles[l][m]._id) {
															let element = document.getElementById("cell" + ((l * this._board.getSize()) + (m + 1)));
															this._animate.bind(this);
															this._animate(element, key, newTiles[j][k].getMoves()[key]);
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					// verschieben + ineinander schieben
					else {
						for (let j = 0; j < this._board.getSize(); j++) {
							for (let k = 0; k < this._board.getSize(); k++) {
								document.getElementById("cell" + ((j * this._board.getSize()) + (k + 1))).className = "";
								if (newTiles[j][k].getCombinedTiles().includes(idsOld[i])) {
									for (let key in newTiles[j][k].getMoves()) {
										if (newTiles[j][k].getMoves().hasOwnProperty(key)) {
											if (newTiles[j][k].getMoves()[key] !== 0) {
												for (let l = 0; l < this._board.getSize(); l++) {
													for (let m = 0; m < this._board.getSize(); m++) {
														if (newTiles[j][k].getCombinedTiles().includes(oldTiles[l][m]._id)) {
															let element = document.getElementById("cell" + ((l * this._board.getSize()) + (m + 1)));
															this._animate.bind(this);
															this._animate(element, key, newTiles[j][k].getMoves()[key]);
														}
													}
												}
											}
										}
									}
									document.getElementById("cell" + ((j * this._board.getSize()) + (k + 1))).textContent = this._board.getTiles()[j][k].getValue();
								}
							}
						}
					}
				}
			}

			_animate(tile, direction, value) {
				let topPosition = tile.style.top;
				topPosition = parseInt(topPosition.replace("px", ""));
				let leftPosition = tile.style.left;
				leftPosition = parseInt(leftPosition.replace("px", ""));
				let element = tile;
				let position = 0;
				const POSITIONFACTOR = document.getElementById("board").offsetWidth / this._board.getSize();
				if (direction === "right" || direction === "left") {
					position = leftPosition;
				}
				else {
					position = topPosition;
				}
				const TIMEOUT = 10;
				let id = setInterval(frame.bind(this), TIMEOUT);
				function frame() {
					switch (direction) {
						case "right":
							if (position === leftPosition + (value * POSITIONFACTOR)) {
								clearInterval(id);
								this._setNewValues();
							}
							else {
								position++;
								element.style.top = topPosition + "px";
								element.style.left = position + "px";
							}
							break;
						case "left" :
							if (position === leftPosition - (value * POSITIONFACTOR)) {
								clearInterval(id);
								this._setNewValues();
							}
							else {
								position--;
								element.style.top = topPosition + "px";
								element.style.left = position + "px";
							}
							break;
						case "down" :
							if (position === topPosition + (value * POSITIONFACTOR)) {
								clearInterval(id);
								this._setNewValues();
							}
							else {
								position++;
								element.style.top = position + "px";
								element.style.left = leftPosition + "px";
							}
							break;
						case "up":
							if (position === topPosition - (value * POSITIONFACTOR)) {
								clearInterval(id);
								this._setNewValues();
							}
							else {
								position--;
								element.style.top = position + "px";
								element.style.left = leftPosition + "px";
							}
							break;
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
		return HtmlRenderer2049;
	});
