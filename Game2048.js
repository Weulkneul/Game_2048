"use strict";

define("Game2048",
	["GameBoard2048", "HtmlRenderer2048"],
	function (GameBoard2048, HtmlRenderer2048) {
		class Game2048 {

			_resetGame(GAMEBOARDSIZE) {
				this._board = new GameBoard2048(GAMEBOARDSIZE);
				this._renderer = new HtmlRenderer2048(this._board, this);
				this._renderer._refreshBoardAndScore();
				this._listenForEvents();
			}

			_listenForEvents() {
				document.onkeydown = this._handleKeyboardInput.bind(this);
			}
			_handleKeyboardInput(e) {
				let changed = null;
				console.log(this._board.checkGameOver());
				switch (e.key) {
					case "ArrowLeft":
						changed = this._board.moveLeft();
						if (!changed && this._board.checkGameOver()) {
							this._renderer._placeRestartButton();
						}
						this._renderer._refreshBoardAndScore();
						break;
					case "ArrowUp":
						changed = this._board.moveUp();
						if (!changed && this._board.checkGameOver()) {
							this._renderer._placeRestartButton();
						}
						this._renderer._refreshBoardAndScore();
						break;
					case "ArrowRight":
						changed = this._board.moveRight();
						if (!changed && this._board.checkGameOver()) {
							this._renderer._placeRestartButton();
						}
						this._renderer._refreshBoardAndScore();
						break;
					case "ArrowDown":
						changed = this._board.moveDown();
						if (!changed && this._board.checkGameOver()) {
							this._renderer._placeRestartButton();
						}
						this._renderer._refreshBoardAndScore();
						break;
				}
			}

			constructor() {
				const GAMEBOARDSIZE = 4;
				this._resetGame(GAMEBOARDSIZE);
			}
}
		return Game2048;
	});
