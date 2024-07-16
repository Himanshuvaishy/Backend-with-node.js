let express = require("express");
let app= express();
let port = 8080;



// This middleware is used to parse URL-encoded data (data sent via HTML forms). The extended: true option allows for parsing of nested objects, which means that you can send complex objects in your forms.
app.use(express.urlencoded({extended:true}));

// This middleware is used to parse incoming JSON payloads. It is commonly used when you expect the request body to be in JSON format.
app.use(express.json());



// handling data in get
    app.get("/request", (req,res)=>{
    let {user,pass}= req.query;
    console.log(req.query);
   
    res.send(`welcome ${user} your password is ${pass}`);
})
// handling data in post
   app.post("/request", (req,res)=>{
    let {username,password}=req.body;
    console.log(req.body);
 // console.log(userername);
    
    res.send(`username is ${username} and pass ${password}`);
    })

    app.listen(port,()=>{
        console.log(`listening port no. ${port}`);
    });