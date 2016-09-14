'use strict';

var randnum = {
        calculate(min, max){
            return Math.floor(Math.random()*(max-min+1))+min;
        }
    }
    var probability = {
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
    var index1 = {
        getIndex(wert) {
            return Math.ceil(wert / 4) - 1;
        }
    }
    var index2 = {
        getIndex(wert){
            if(wert % 4 == 0) {
                return 3;
            }
            else {
                return wert % 4 -1;
            }
        }
    }

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
    var zahl1 = randnum.calculate(1,16);
    console.log(zahl1);
    this.matrix[index1.getIndex(zahl1)][index2.getIndex(zahl1)] = probability.getNum();
    do{
        var zahl2 = randnum.calculate(1,16);
    } while(zahl1 === zahl2)
    console.log(zahl2);
    this.matrix[index1.getIndex(zahl2)][index2.getIndex(zahl2)] = probability.getNum();
    console.log("Initialize:");
   }

   right(){
    let changed = false;
       for(let i=0; i<this.matrix.length; i++){
            let add = false;
           for(let j=this.matrix[i].length-1; j>=0; j--) {
               if(this.matrix[i][j] !== 0 ) {
                   while(j < this.matrix[i].length-1 && this.matrix[i][j+1] === 0) {
                        this.matrix[i][j+1] = this.matrix[i][j];
                        this.matrix[i][j] = 0;
                        changed=true;
                        j++;
                   }
                    if(j < this.matrix[i].length-1 && this.matrix[i][j] === this.matrix[i][j+1] && !add) {
                        this.matrix[i][j+1] = this.matrix[i][j] + this.matrix[i][j+1];
                        this.matrix[i][j] = 0;
                        changed = true;
                        add= true;
                        j++;
                        while(j < this.matrix[i].length-1 && this.matrix[i][j+1] === 0) {
                        this.matrix[i][j+1] = this.matrix[i][j];
                        this.matrix[i][j] = 0;
                        j++;
                     }
                    }
               }
           }
       }
       do{
       var zahl = randnum.calculate(1,16);
       } while(this.matrix[index1.getIndex(zahl)][index2.getIndex(zahl)] !== 0) 
       if(changed){
           this.matrix[index1.getIndex(zahl)][index2.getIndex(zahl)] = probability.getNum();
       }
       console.log("Right:");
   }

   left(){
    let changed = false;
       for(let i=0; i<this.matrix.length; i++){
            let add = false;
           for(let j=0; j<=this.matrix[i].length-1; j++) {
               if(this.matrix[i][j] !== 0 ) {
                   while(j>0 && this.matrix[i][j-1] === 0) {
                        this.matrix[i][j-1] = this.matrix[i][j];
                        this.matrix[i][j] = 0;
                        changed=true;
                        j--;
                   }
                    if(j > 0 && this.matrix[i][j] === this.matrix[i][j-1] && !add) {
                        this.matrix[i][j-1] = this.matrix[i][j] + this.matrix[i][j-1];
                        this.matrix[i][j] = 0;
                        changed=true;
                        add = true;
                        j--;
                        while(j>0 && this.matrix[i][j-1] === 0) {
                        this.matrix[i][j-1] = this.matrix[i][j];
                        this.matrix[i][j] = 0;
                        j--;
                        }
                    }
               }
           }
       }
       do{
       var zahl = randnum.calculate(1,16);
       } while(this.matrix[index1.getIndex(zahl)][index2.getIndex(zahl)] !== 0) 
       if(changed){
           this.matrix[index1.getIndex(zahl)][index2.getIndex(zahl)] = probability.getNum();
       }
        console.log("Left:");
   }

   up(){
    let changed = false;
       for(let i=0; i<this.matrix.length; i++){
            let add = false;
           for(let j=0; j<=this.matrix.length-1; j++) {
               if(this.matrix[j][i] !== 0 ) {
                   while(j>0 && this.matrix[j-1][i] === 0) {
                        this.matrix[j-1][i] = this.matrix[j][i];
                        this.matrix[j][i] = 0;
                        changed = true;
                        j--;
                   }
                    if(j>0 && this.matrix[j][i] === this.matrix[j-1][i] && !add) {
                        this.matrix[j-1][i] = this.matrix[j][i] + this.matrix[j-1][i];
                        this.matrix[j][i] = 0;
                        j--;
                        add = true;
                        changed=true;
                        while(j>0 && this.matrix[j-1][i] === 0) {
                        this.matrix[j-1][i] = this.matrix[j][i];
                        this.matrix[j][i] = 0;
                        j--;
                     }
                    }
               }
           }
       }
       do{
       var zahl = randnum.calculate(1,16);
       } while(this.matrix[index1.getIndex(zahl)][index2.getIndex(zahl)] !== 0) 
       if(changed){
           this.matrix[index1.getIndex(zahl)][index2.getIndex(zahl)] = probability.getNum();
       }
        console.log("Up:");
   }

   down(){
    let changed = false;
       for(let i=0; i<this.matrix.length; i++){
           let add = false;
           for(let j=this.matrix.length-1; j>=0; j--) {
               if(this.matrix[j][i] !== 0 ) {
                   while(j < this.matrix.length-1 && this.matrix[j+1][i] === 0) {
                        this.matrix[j+1][i] = this.matrix[j][i];
                        this.matrix[j][i] = 0;
                        changed = true;
                        j++;
                   }
                    if(j < this.matrix.length-1 && this.matrix[j][i] === this.matrix[j+1][i] && !add) {
                        this.matrix[j+1][i] = this.matrix[j][i] + this.matrix[j+1][i];
                        this.matrix[j][i] = 0;
                        j++;
                        changed = true;
                        add = true;
                         while(j < this.matrix.length-1 && this.matrix[j+1][i] === 0) {
                        this.matrix[j+1][i] = this.matrix[j][i];
                        this.matrix[j][i] = 0;
                        j++;
                     }
                    }
               }
           }
       }
       do{
       var zahl = randnum.calculate(1,16);
       } while(this.matrix[index1.getIndex(zahl)][index2.getIndex(zahl)] !== 0)
       if(changed){
           this.matrix[index1.getIndex(zahl)][index2.getIndex(zahl)] = probability.getNum();
       } 
        console.log("Down:");
   }

   play(){
       for(let i=0; i<4;i++){
            console.log(this.matrix[i]);
       }
       console.log("\n");
   }

}

var game = new field(80, null);
game.initialize();
game.play();
game.up();
game.play();
game.down();
game.play();
game.right();
game.play();
game.down();
game.play();
game.right();
game.play();
game.left();
game.play();
game.up();
game.play();
game.left();
game.play();
game.down();
game.play();
game.up();
game.play();
game.right();
game.play();
game.left();
game.play();










