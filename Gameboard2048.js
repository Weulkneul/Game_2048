'use strict';


class GameBoard2048 {
   
    getMatrix() {
        return this._matrix;
    }
       
    getSize(){
        return this._size;
    }

    getRandomFreeCell(){
        let zahl;
        do {
        zahl = Math.floor(Math.random()*this.getSize()*this.getSize())+1;
        } while(this.getMatrix()[this.getRow(zahl)][this.getColumn(zahl)] !== 0) 
        return zahl;
    }

    getRandomCellValue(){
        return Math.random()<0.9 ? 2 : 4;
    }

    getRow(index){
        return Math.ceil(index / this.getSize()) - 1;
    }

    getColumn(index){
        return index % this.getSize() === 0 ? this.getSize()-1 : index % this.getSize()-1; 
    }
   
   constructor(size){
       
       this._size = size;
       this._matrix = new Array(size);

       for(let i=0; i < size; i++){
            this._matrix[i] = new Array(size);
            for(let j=0; j < size; j++){
                this._matrix[i][j] = 0;
            }
        }

        
        var zahl1 = this.getRandomFreeCell();
        console.log(zahl1);
        this._matrix[this.getRow(zahl1)][this.getColumn(zahl1)] = this.getRandomCellValue();

        var zahl2 = this.getRandomFreeCell();

        console.log(zahl2);
        this._matrix[this.getRow(zahl2)][this.getColumn(zahl2)] = this.getRandomCellValue();
        console.log("Initialize:");
   }
   

   printMatrix(){
       for(let i=0; i<this.getSize();i++){
            console.log(this.getMatrix()[i]);
       }
       console.log("\n");
   } 

   moveRight(){
    let changed = false;
       for(let i=0; i< this.getMatrix().length; i++){
           let alreadyJoinedTogether = new Array(this.getSize());
           for(let k = 0; k < alreadyJoinedTogether.length; k++){
               alreadyJoinedTogether[k] = false;
           }
           for(let j = this.getMatrix()[i].length-1; j>=0; j--) {
               if(this.getMatrix()[i][j] !== 0 ) {
                   while(j < this.getMatrix()[i].length-1 && this.getMatrix()[i][j+1] === 0) {
                        this.getMatrix()[i][j+1] = this.getMatrix()[i][j];
                        this.getMatrix()[i][j] = 0;
                        changed=true;
                        j++;
                   }
                    if(j < this.getMatrix()[i].length-1 && this.getMatrix()[i][j] === this.getMatrix()[i][j+1] && !alreadyJoinedTogether[j] && !alreadyJoinedTogether[j+1]) {
                        this.getMatrix()[i][j+1] = this.getMatrix()[i][j] + this.getMatrix()[i][j+1];
                        this.getMatrix()[i][j] = 0;
                        changed = true;
                        j++;
                        while(j < this.getMatrix()[i].length-1 && this.getMatrix()[i][j+1] === 0) {
                            this.getMatrix()[i][j+1] = this.getMatrix()[i][j];
                            this.getMatrix()[i][j] = 0;
                            j++;
                        }
                        alreadyJoinedTogether[j] = true;
                    }
               }
           }
       }
       let zahl = this.getRandomFreeCell();
       if(changed){
           this.getMatrix()[this.getRow(zahl)][this.getColumn(zahl)] = this.getRandomCellValue();
       }
       console.log("Right:");
   }

   moveLeft(){
    let changed = false;
       for(let i=0; i< this.getMatrix().length; i++){
            let alreadyJoinedTogether = new Array(this.getSize());
           for(let k = 0; k < alreadyJoinedTogether.length; k++){
               alreadyJoinedTogether[k] = false;
           }
           for(let j=0; j <= this.getMatrix()[i].length-1; j++) {
               if(this.getMatrix()[i][j] !== 0 ) {
                   while(j > 0 && this.getMatrix()[i][j-1] === 0) {
                        this.getMatrix()[i][j-1] = this.getMatrix()[i][j];
                        this.getMatrix()[i][j] = 0;
                        changed=true;
                        j--;
                   }
                    if(j > 0 && this.getMatrix()[i][j] === this.getMatrix()[i][j-1] && !alreadyJoinedTogether[j] && !alreadyJoinedTogether[j+1]) {
                        this.getMatrix()[i][j-1] = this.getMatrix()[i][j] + this.getMatrix()[i][j-1];
                        this.getMatrix()[i][j] = 0;
                        changed=true;
                        j--;
                        while(j > 0 && this.getMatrix()[i][j-1] === 0) {
                            this.getMatrix()[i][j-1] = this.getMatrix()[i][j];
                            this.getMatrix()[i][j] = 0;
                            j--;
                        }
                        alreadyJoinedTogether[j] = true;  
                    }
               }
           }
       }
       let zahl = this.getRandomFreeCell();
       if(changed){
           this.getMatrix()[this.getRow(zahl)][this.getColumn(zahl)] = this.getRandomCellValue();
       }
        console.log("Left:");
   }

   moveUp(){
    let changed = false;
       for(let i=0; i < this.getMatrix().length; i++){
            let alreadyJoinedTogether = new Array(this.getSize());
           for(let k = 0; k < alreadyJoinedTogether.length; k++){
               alreadyJoinedTogether[k] = false;
           }
           for(let j=0; j <= this.getMatrix().length-1; j++) {
               if(this.getMatrix()[j][i] !== 0 ) {
                   while(j > 0 && this.getMatrix()[j-1][i] === 0) {
                        this.getMatrix()[j-1][i] = this.getMatrix()[j][i];
                        this.getMatrix()[j][i] = 0;
                        changed = true;
                        j--;
                   }
                    if(j > 0 && this.getMatrix()[j][i] === this.getMatrix()[j-1][i] && !alreadyJoinedTogether[j] && !alreadyJoinedTogether[j+1]) {
                        this.getMatrix()[j-1][i] = this.getMatrix()[j][i] + this.getMatrix()[j-1][i];
                        this.getMatrix()[j][i] = 0;
                        j--;
                        changed=true;
                        while(j > 0 && this.getMatrix()[j-1][i] === 0) {
                            this.getMatrix()[j-1][i] = this.getMatrix()[j][i];
                            this.getMatrix()[j][i] = 0;
                            j--;
                        }
                        alreadyJoinedTogether[j] = true;
                    }
               }
           }
       }
      let zahl = this.getRandomFreeCell();
       if(changed){
           this.getMatrix()[this.getRow(zahl)][this.getColumn(zahl)] = this.getRandomCellValue();
       }
        console.log("Up:");
   }

   moveDown(){
    let changed = false;
       for(let i=0; i < this.getMatrix().length; i++){
            let alreadyJoinedTogether = new Array(this.getSize());
           for(let k = 0; k < alreadyJoinedTogether.length; k++){
               alreadyJoinedTogether[k] = false;
           }
           for(let j = this.getMatrix().length-1; j >= 0; j--) {
               if(this.getMatrix()[j][i] !== 0 ) {
                   while(j < this.getMatrix().length-1 && this.getMatrix()[j+1][i] === 0) {
                        this.getMatrix()[j+1][i] = this.getMatrix()[j][i];
                        this.getMatrix()[j][i] = 0;
                        changed = true;
                        j++;
                   }
                    if(j < this.getMatrix().length-1 && this.getMatrix()[j][i] === this.getMatrix()[j+1][i] && !alreadyJoinedTogether[j] && !alreadyJoinedTogether[j+1]) {
                        this.getMatrix()[j+1][i] = this.getMatrix()[j][i] + this.getMatrix()[j+1][i];
                        this.getMatrix()[j][i] = 0;
                        j++;
                        changed = true;
                        while(j < this.getMatrix().length-1 && this.getMatrix()[j+1][i] === 0) {
                            this.getMatrix()[j+1][i] = this.getMatrix()[j][i];
                            this.getMatrix()[j][i] = 0;
                            j++;
                        }
                        alreadyJoinedTogether[j] = true;
                    }
               }
           }
       }
       let zahl = this.getRandomFreeCell();
       if(changed){
           this.getMatrix()[this.getRow(zahl)][this.getColumn(zahl)] = this.getRandomCellValue();
       } 
        console.log("Down:");
   }

   
}

var game = new GameBoard2048(4);
game.printMatrix();
game.moveRight();
game.printMatrix();
game.moveDown();
game.printMatrix();
game.moveRight();
game.printMatrix();
game.moveDown();
game.printMatrix();
game.moveRight();
game.printMatrix();
game.moveLeft();
game.printMatrix();
game.moveUp();
game.printMatrix();
game.moveLeft();
game.printMatrix();
game.moveDown();
game.printMatrix();
game.moveUp();
game.printMatrix();
game.moveRight();
game.printMatrix();
game.moveLeft();
game.printMatrix();










