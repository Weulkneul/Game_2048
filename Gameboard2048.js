'use strict';

var matrix;

class Gameboard2048 {

   constructor(size){
       var size = size;
       matrix = new Array(size);
       this.getMatrix = function() {
           return matrix;
       }
       this.getSize = function(){
           return size;
       }

       this.getCalculate = function(min, max) {
           return calculate(min, max);
       }

       this.getNum = function(){
           return numb();
       }

       this.getIndex1 = function(wert){
           return index1(wert);
       }

       this.getIndex2 = function(wert) {
           return index2(wert);
       }

       function calculate(min, max){
            return Math.floor(Math.random()*(max-min+1))+min;
            }
        function numb(){
            let num = Math.random();
            if(num < 0.9){
                return 2;
            }
            else {
                return 4;
            }
         }
        function index1(wert){
            return Math.ceil(wert / 4) - 1;
         }
        function index2(wert){
            if(wert % 4 == 0) {
                return 3;
            }
            else {
                return wert % 4 -1;
            }
         }

       function initialize(){
        for(let i=0; i < size; i++){
            matrix[i] = new Array(size);
            for(let j=0; j < size; j++){
                matrix[i][j] = 0;
            }
        }
        var zahl1 = calculate(1,16);
        console.log(zahl1);
        matrix[index1(zahl1)][index2(zahl1)] = numb();
        do{
            var zahl2 = calculate(1,16);
        } while(zahl1 === zahl2)
        console.log(zahl2);
        matrix[index1(zahl2)][index2(zahl2)] = numb();
        console.log("Initialize:");
        }

        initialize();
    }

   moveright(){
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

   moveleft(){
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

   moveup(){
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

   movedown(){
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

   printMatrix(){
       for(let i=0; i<4;i++){
            console.log(matrix[i]);
       }
       console.log("\n");
   }
}

var game = new Gameboard2048(4);
game.printMatrix();
game.moveright();
game.printMatrix();
game.movedown();
game.printMatrix();
game.moveright();
game.printMatrix();
game.movedown();
game.printMatrix();
game.moveright();
game.printMatrix();
game.moveleft();
game.printMatrix();
game.moveup();
game.printMatrix();
game.moveleft();
game.printMatrix();
game.movedown();
game.printMatrix();
game.moveup();
game.printMatrix();
game.moveright();
game.printMatrix();
game.moveleft();
game.printMatrix();










