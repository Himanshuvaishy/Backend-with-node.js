const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
let app = express();
const path = require("path");
const { log } = require("console");
const { v4: uuidv4 } = require('uuid');
uuidv4();

// it use to allow html can perform on all method 
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "Node_Sql",
  password: "Him@83170",
});

// home route
app.get("/", (req, res) => {
  let q = "select count(*) from user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      // res.send(result);
      res.render("home.ejs", { count });
    });
  } catch (err) {
    res.send(" there is some error in database");
  }
});
// show route
app.get("/user", (req, res) => {
  let q = "select * from user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let alldata = result;
      // res.send(result);
      res.render("show.ejs", { alldata });
    });
  } catch (err) {
    res.send(" there is some error in database");
  }
});
// Edit
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `select * from  user  where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      //console.log(result);

      result.forEach((data) => {
        //   //console.log(data);

        // console.log(data.username);
        // // let {username,}=result[0];
        // //  console.log(username);
        let pass = data.password;
        console.log(pass);
        res.render("edit.ejs", { data });
      });
    });
  } catch (err) {
    res.send(" there is some error in database");
  }
});

// edit username
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let q = `select * from  user  where id='${id}'`;
  let { username: newUser, password } = req.body;
  let formPassword = password.trim();

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      result.forEach((data) => {
        if (formPassword != data.password) {
          console.log("Incorrect password");
        }
        else {
          let q2 = `update user SET username='${newUser}' where id='${id}' `;
          connection.query(q2, (err, result) => {
            if (err) throw err;
            res.redirect("/user");

          })
        }

      })
    });
  } catch (err) {
    res.send(" there is some error in database");

  }
});

// new user

app.get("/user/new", (req, res) => {

  res.render("newuser.ejs");

});

app.post("/user/new", (req, res) => {
  let { username, password, email } = req.body;
  let id = uuidv4();



  let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;


  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log("added new user");
      res.redirect("/user");
    });
  } catch (err) {
    res.send("some error occurred");
  }
});
// delte 
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      result.forEach((data) => {
        console.log(data.password);
        res.render("delete.ejs", { data })
      })
    });
  } catch (err) {
    res.send("some error with DB");
  }
});
app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      result.forEach((data) => {
        if (data.password != password) {
          res.send("WRONG Password entered!");
        } else {
          let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
          connection.query(q2, (err, result) => {
            if (err) throw err;
            else {
              res.redirect("/user");
            }

          })

        }
      })

    })
  } catch (err) {
    res.send("some error with DB");
  }

})




app.listen("8080", () => {
  console.log(`app is listening port at 8080`);
});

/// this part is used to generate fake data and store that data into user table

//  it is used to generate fake data
// let getRandomUser = () => {
//   return [
//     faker.string.uuid(),

//     faker.internet.userName(),
//     faker.internet.email(),
//     faker.internet.password(),
//   ];
// };

// try{
//     connection.query(q,[data],(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//      });

//   }catch(err){
//     console.log(err);

//   }
//    connection.end();

// let q="INSERT INTO user (id,username,email,password,Edit) VALUES ?";

// let data=[];
// for(let i=0;i<100;i++){
//   // console.log(getRandomUser());
//   data.push(getRandomUser());
// }

// console.log(data);
