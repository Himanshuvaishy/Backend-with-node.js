let express=require("express");
let app=express();
let path=require("path");
// we do not require ejs libaray beacuse express automatically require the ejs libaray , we do not require or import ejs file beacuse view-engine automatically do it when we create directory name views , if the name is different directory we need to explicitly define it's path.
let port=8080; 

app.use(express.static(path.join(__dirname,"public")));// different folder
//app.use(express.static("/public/styles"));//---- this is used when run server on same page
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");

app.listen(port,()=>{
    console.log(`listining on port ${port}`);
})

//app.set("view engine","ejs");

app.get("/",(req,res)=>{
    // res.render("../abc/home.ejs");
    res.render("home.ejs");
    // we can remove .ejs extension
})

app.get("/hello",(req,res)=>{
    // res.render("../abc/home.ejs");
    res.send("hello");
    // we can remove .ejs extension
})


app.get("/rolldice",(req,res)=>{
   let Dicedata=Math.floor(Math.random()*6)+1;
  res.render("rolldice.ejs",{Dicedata});
    // we can remove .ejs extension
})

// app.get("/ig/:username",(req,res)=>{
//     let {username}=req.params;
//     let followers=["ankit","sachin","himanshu"];
//     //let uppercase= username.toUpperCase()
//     res.render("instagram",{username,followers})
//      // we can remove .ejs extension
//  })

 app.get("/ig/:username",(req,res)=>{
    let {username}=req.params;
    let InstaData=require("./data.json")
   // console.log(InstaData);
    let data= InstaData[username];
    //console.log(data);
    if(data) {
        
        res.render ("instagram.ejs",{data})
    }
    else {
        res.render("error.ejs"); 
    }
    
     
 })
 
