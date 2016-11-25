"use strict";

define("Tile", [],
	function () {
		class Tile {
			getValue() {
				return this._value;
			}
			getId() {
				return this._id;
			}
			getCombinedTiles() {
				return this._combinedTiles;
			}
			getPosition() {
				return this._position;
			}

			setValue(value) {
				this._value = value;
			}
			setCombinedTiles(combinedTiles) {
				this._combinedTiles = combinedTiles;
			}
			changePosition(direction) {
				switch (direction) {
					case "right":
						this._position.x += 1;
						break;
					case "left":
						this._position.x -= 1;
						break;
					case "up":
						this._position.y -= 1;
						break;
					case "down":
						this._position.y += 1;
						break;
				}
			}

			constructor(value, combinedTiles, position) {
				this._value = value;
				this._id = Tile.NEXTID++;
				this._combinedTiles = combinedTiles;
				this._position = position;
				this._moved = false;
			}
        }
		Tile.NEXTID = 0;
		return Tile;
	});
