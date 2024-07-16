const { faker }=require('@faker-js/faker');
const mysql = require('mysql2');


// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Node_Sql',
    password:'Him@83170',
  });

  try{
    connection.query("Show tables",(err,result)=>{
        if(err) throw err;
        console.log(result);
     });

  }catch(err){
    console.log(err);

  }
  connection.end();



let  getRandomUser =()=> {
    return {
      Id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
     
      password: faker.internet.password(),
     
    };
  } ;

  //console.log(getRandomUser());