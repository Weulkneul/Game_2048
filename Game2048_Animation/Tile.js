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
			getMoved() {
				return this._moved;
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
			moved() {
				this._moved = true;
			}
			// Id wird beim Erstellen eines neuen Tiles durch ein statisches Klassenattribut repräsentiert, welches jedesmal inkrementiert wird
			// Moved ist ein boolesches Attribut, dass nur auf true gesetzt wird, wenn das verschobene Tile animiert werden muss
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
