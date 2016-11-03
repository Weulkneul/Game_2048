"use strict";

define("HtmlRenderer2048", [],
	function () {
		class HtmlRenderer2048 {
			constructor(board, game) {
				this._board = board;
				this._game = game;
			}

			//Matrix als HTML-Tabelle in einem String zusammenfassen
			printTable(newNumbersArray) {
				let table = "<table>";
				for (let i = 0; i < this._board.getSize(); i++) {
					table += "<tr>";
					for (let j = 0; j < this._board.getSize(); j++) {
						let classes = "cell" + this._board.getMatrix()[i][j];
						if (newNumbersArray.includes((i * this._board.getSize()) + (j + 1))) {
							classes += " spawn";
						}
						table += "<td class='" + classes + "'>" + this._board.getMatrix()[i][j] + "</td>";
					}
					table += "</tr>";
				}
				table += "</table>";

				return table;
			}

			refreshBoardAndScore() {
				document.getElementById("table_board").innerHTML = this.printTable(this._board.getNewNumbersArray());
				document.getElementById("score").innerHTML = "Score: " + this._board.getScore();
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
