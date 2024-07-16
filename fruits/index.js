// it is a entry point when we try to access any particular directory the require method search for index file(entry point) in a directorty 


const apple=require("./apple");
const banana=require("./banana");
const mango=require("./mango");

let fruits=[apple,banana,mango];

module.exports=fruits;
