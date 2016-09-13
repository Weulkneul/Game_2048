class field {
   constructor(width, matrix){
       this.width = width;
       this.matrix = matrix;
   }
   initialize() {
    let randnum = {
        calculate(min, max){
       return Math.floor(Math.random()*(max-min+1))+min;
        }
    }
    this.matrix =  [[0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]];
    let probability = function(){
        let num = Math.random();
        if(num < 0.9){
            return 2;
        }
        else {
            return 4;
        }
    }
    let zahl1 = randnum.calculate(1,16);
    this.matrix[zahl1/4][zahl1%4] = probability;
    do{
        let zahl2 = randnum.calculate(1,16);
    } while(zahl1 === zahl2)
    this.matrix[zahl2/4][zahl2%4] = probability;
   }
   right(){

   }
   left(){

   }
   up(){

   }
   down(){
       
   }
}