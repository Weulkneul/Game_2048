'use strict';


class GameBoard2048 {
   
    getMatrix() {
        return this._matrix;
    }
       
    getSize(){
        return this._size;
    }

    getRandomFreeCell(){
            return Math.floor(Math.random()*this.getSize()*this.getSize())+1;
    }

    getRandomCellValue(){
        return Math.random()<0.9 ? 2 : 4;
    }

    getRow(index){
        return Math.ceil(index / this.getSize()) - 1;
    }

    getColumn(index){
        return index % size === 0 ? this.getSize()-1 : index % this.getSize()-1; 
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
       for(let i=0; i< matrix.length; i++){
            let add = false;
           for(let j=matrix[i].length-1; j>=0; j--) {
               if(matrix[i][j] !== 0 ) {
                   while(j < matrix[i].length-1 && matrix[i][j+1] === 0) {
                        matrix[i][j+1] = matrix[i][j];
                        matrix[i][j] = 0;
                        changed=true;
                        j++;
                   }
                    if(j < matrix[i].length-1 && matrix[i][j] === matrix[i][j+1] && !add) {
                        matrix[i][j+1] = matrix[i][j] + matrix[i][j+1];
                        matrix[i][j] = 0;
                        changed = true;
                        add= true;
                        j++;
                    }
               }
           }
       }
       do{
       var zahl = this.getCalculate(1,16);
       } while(matrix[this.getIndex1(zahl)][this.getIndex2(zahl)] !== 0) 
       if(changed){
           matrix[this.getIndex1(zahl)][this.getIndex2(zahl)] = this.getNum();
       }
       console.log("Right:");
   }

   moveLeft(){
    let changed = false;
       for(let i=0; i< matrix.length; i++){
            let add = false;
           for(let j=0; j <= matrix[i].length-1; j++) {
               if(matrix[i][j] !== 0 ) {
                   while(j>0 && matrix[i][j-1] === 0) {
                        matrix[i][j-1] = matrix[i][j];
                        matrix[i][j] = 0;
                        changed=true;
                        j--;
                   }
                    if(j > 0 && matrix[i][j] === matrix[i][j-1] && !add) {
                        matrix[i][j-1] = matrix[i][j] + matrix[i][j-1];
                        matrix[i][j] = 0;
                        changed=true;
                        add = true;
                        j--;
                    }
               }
           }
       }
       do{
       var zahl = this.getCalculate(1,16);
       } while(matrix[this.getIndex1(zahl)][this.getIndex2(zahl)] !== 0) 
       if(changed){
           matrix[this.getIndex1(zahl)][this.getIndex2(zahl)] = this.getNum();
       }
        console.log("Left:");
   }

   moveUp(){
    let changed = false;
       for(let i=0; i<matrix.length; i++){
            let add = false;
           for(let j=0; j<=matrix.length-1; j++) {
               if(matrix[j][i] !== 0 ) {
                   while(j>0 && matrix[j-1][i] === 0) {
                        matrix[j-1][i] = matrix[j][i];
                        matrix[j][i] = 0;
                        changed = true;
                        j--;
                   }
                    if(j>0 && matrix[j][i] === matrix[j-1][i] && !add) {
                        matrix[j-1][i] = matrix[j][i] + matrix[j-1][i];
                        matrix[j][i] = 0;
                        j--;
                        add = true;
                        changed=true;
                    }
               }
           }
       }
       do{
       var zahl = this.getCalculate(1,16);
       } while(matrix[this.getIndex1(zahl)][this.getIndex2(zahl)] !== 0) 
       if(changed){
           matrix[this.getIndex1(zahl)][this.getIndex2(zahl)] = this.getNum();
       }
        console.log("Up:");
   }

   moveDown(){
    let changed = false;
       for(let i=0; i<matrix.length; i++){
           let add = false;
           for(let j=matrix.length-1; j>=0; j--) {
               if(matrix[j][i] !== 0 ) {
                   while(j < matrix.length-1 && matrix[j+1][i] === 0) {
                        matrix[j+1][i] = matrix[j][i];
                        matrix[j][i] = 0;
                        changed = true;
                        j++;
                   }
                    if(j < matrix.length-1 && matrix[j][i] === matrix[j+1][i] && !add) {
                        matrix[j+1][i] = matrix[j][i] + matrix[j+1][i];
                        matrix[j][i] = 0;
                        j++;
                        changed = true;
                        add = true;
                    }
               }
           }
       }
       do{
       var zahl = this.getCalculate(1,16);
       } while(matrix[this.getIndex1(zahl)][this.getIndex2(zahl)] !== 0)
       if(changed){
           matrix[this.getIndex1(zahl)][this.getIndex2(zahl)] = this.getNum();
       } 
        console.log("Down:");
   }

   
}

var game = new GameBoard2048(4);
game.printMatrix();
/*game.moveRight();
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
game.printMatrix();*/










