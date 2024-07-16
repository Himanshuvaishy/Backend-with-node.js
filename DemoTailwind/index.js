let express=require("express");
let app=express();
let path=require("path");


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));// different folder
//app.use(express.static("public"));---- this is used when run server on same page
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");
 app.get('/',(req,res)=>{
   res.render('index.ejs')
 })
let port=8080;
app.listen(port,()=>{
    console.log(`listining on port ${port}`);
})

