'use strict';
class field {

   constructor(width, matrix){
       this.width = width;
       this.matrix = matrix;
   }

   initialize() {
    this.matrix =  [[0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]];
    let randnum = {
        calculate(min, max){
            return Math.floor(Math.random()*(max-min+1))+min;
        }
    }
    let probability = {
        getNum(){
            let num = Math.random();
            if(num < 0.9){
                return 2;
            }
            else {
                return 4;
            }
        }
    }
    let index1 = {
        getIndex(wert) {
            return Math.ceil(wert / 4) - 1;
        }
    }
    let index2 = {
        getIndex(wert){
            if(wert % 4 == 0) {
                return 3;
            }
            else {
                return wert % 4 -1;
            }
        }
    }
    var zahl1 = randnum.calculate(1,16);
    console.log(zahl1);
    this.matrix[index1.getIndex(zahl1)][index2.getIndex(zahl1)] = probability.getNum();
    do{
        var zahl2 = randnum.calculate(1,16);
    } while(zahl1 === zahl2)
    console.log(zahl2);
    this.matrix[index1.getIndex(zahl2)][index2.getIndex(zahl2)] = probability.getNum();
   }

   right(){

   }

   left(){

   }

   up(){

   }

   down(){
       
   }

   play(){
    console.log(this.matrix);
   }

}

var game = new field(80, null);
game.initialize();
game.play();