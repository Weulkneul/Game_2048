"use strict";

define("Game2048",
	["GameBoard2048", "HtmlRenderer2048"],
	function (GameBoard2048, HtmlRenderer2048) {
		class Game2048 {

			resetGame(GAMEBOARDSIZE) {
				this._board = new GameBoard2048(GAMEBOARDSIZE);
				this._renderer = new HtmlRenderer2048(this._board, this);
				this._renderer.createGameBoard();
				this._listenForEvents();
			}

			_listenForEvents() {
				document.onkeydown = this._handleKeyboardInput.bind(this);
			}

			_handleKeyboardInput(e) {
				// tiefe Kopie der Tiles bevor sie verschoben wurden
				let oldTiles = JSON.parse(JSON.stringify(this._board.getTiles()));
				let moved = false;
				switch (e.key) {
					case "ArrowLeft":
						this._board.moveLeft();
						moved = true;
						break;
					case "ArrowUp":
						this._board.moveUp();
						moved = true;
						break;
					case "ArrowRight":
						this._board.moveRight();
						moved = true;
						break;
					case "ArrowDown":
						this._board.moveDown();
						moved = true;
						break;
				}
				// Falls eine der Arrow Tasten gedrückt wurden, wird die tiefe Kopie und der aktuelle Stand der Tiles an den Renderer weitergeleitet.
				// Ansonsten findet eine Überprüfung statt, ob Tiles überhaupt noch verschoben oder ineinander geschoben werden können
				if (moved) {
					this._renderer.refreshBoardAndScore(oldTiles, this._board.getTiles());
					if (this._board.checkGameOver()) {
						this._renderer.placeRestartButton();
					}
				}
			}

			constructor() {
				// Legt die Spielfeldgröße fest. Standardfall Größe: 4
				const GAMEBOARDSIZE = 4;
				this.resetGame(GAMEBOARDSIZE);
			}
	}
		return Game2048;
	});
