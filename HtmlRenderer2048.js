"use strict";

define("HtmlRenderer2048", [],
	function () {
		class HtmlRenderer2048 {
			constructor(board, game) {
				this._board = board;
				this._game = game;
			}

			//Matrix als HTML-Tabelle in einem String zusammenfassen
			printTable() {
				let table = "<table>";
				for (let i = 0; i < this._board.getSize(); i++) {
					table += "<tr>";
					for (let j = 0; j < this._board.getSize(); j++) {
						table += "<td class='cell" + this._board.getMatrix()[i][j] + "'>" + this._board.getMatrix()[i][j] + "</td>";
					}
					table += "</tr>";
				}
				table += "</table>";

				return table;
			}

			_refreshBoardAndScore() {
				document.getElementById("table_board").innerHTML = this.printTable();
				document.getElementById("score").innerHTML = "Score: " + this._board.getScore();
			}

			_placeRestartButton() {
				document.getElementById("restartButton").style.visibility = "visible";
				document.getElementById("score").style.fontWeight = "bold";
				document.getElementById("restartButton").onclick = this._resetGameBoard.bind(this);
			}

			_resetGameBoard() {
				document.getElementById("restartButton").style.visibility = "hidden";
				document.getElementById("score").style.fontWeight = "normal";
				this._game._resetGame(this._board.getSize());
			}

		}
		return HtmlRenderer2048;
	});
