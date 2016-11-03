"use strict";

define("Game2048",
	["GameBoard2048", "HtmlRenderer2048"],
	function (GameBoard2048, HtmlRenderer2048) {
		class Game2048 {

			resetGame(GAMEBOARDSIZE) {
				this._board = new GameBoard2048(GAMEBOARDSIZE);
				this._renderer = new HtmlRenderer2048(this._board, this);
				this._renderer.refreshBoardAndScore(this._board.getNewNumbersArray());
				this._listenForEvents();
			}

			_listenForEvents() {
				document.onkeydown = this._handleKeyboardInput.bind(this);
			}
			_handleKeyboardInput(e) {
				console.log(this._board.checkGameOver());
				switch (e.key) {
					case "ArrowLeft":
						this._board.moveLeft();
						this._renderer.refreshBoardAndScore(this._board.getNewNumbersArray());
						if (this._board.checkGameOver()) {
							this._renderer.placeRestartButton();
						}
						break;
					case "ArrowUp":
						this._board.moveUp();
						this._renderer.refreshBoardAndScore(this._board.getNewNumbersArray());
						if (this._board.checkGameOver()) {
							this._renderer.placeRestartButton();
						}
						break;
					case "ArrowRight":
						this._board.moveRight();
						this._renderer.refreshBoardAndScore(this._board.getNewNumbersArray());
						if (this._board.checkGameOver()) {
							this._renderer.placeRestartButton();
						}
						break;
					case "ArrowDown":
						this._board.moveDown();
						this._renderer.refreshBoardAndScore(this._board.getNewNumbersArray());
						if (this._board.checkGameOver()) {
							this._renderer.placeRestartButton();
						}
						break;
				}
			}

			constructor() {
				const GAMEBOARDSIZE = 4;
				this.resetGame(GAMEBOARDSIZE);
			}
	}
		return Game2048;
	});
