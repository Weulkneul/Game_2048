"use strict";

define("HtmlRenderer2048", [],
	function () {
		class HtmlRenderer2048 {
			constructor(board, game) {
				this._board = board;
				this._game = game;
			}

			setClassesOfDiv() {
				
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
