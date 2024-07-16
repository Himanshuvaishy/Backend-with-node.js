
let express=require("express");
let app=express();
let path=require("path");
let port=8080;
const {v4:uuidv4}=require('uuid');
//uuidv4();
const methodOverride = require("method-override")
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"))

app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");

let posts = [
    {
        "username": "apnacollege",
        "content": "Apnacollege is a vibrant community dedicated to empowering learners with the knowledge and skills needed to excel in the ever-evolving world of technology. With a focus on practical, hands-on learning experiences, Apnacollege provides comprehensive resources and tutorials on various programming languages, frameworks, and tools. Whether you're a beginner looking to get started with coding or an experienced developer seeking to sharpen your skills, Apnacollege offers something for everyone. Join us on this exciting journey of discovery and growth, and unlock your full potential as a coder. Let's code, learn, and innovate together!",
        "id": "uuidv4()"
    },
    {
        "username": "Himanshu  vaishy",
        "content": "I am Himanshu, and I am passionate about learning coding. My journey into the world of programming started recently, and I am already fascinated by the endless possibilities it offers. Every day, I spend hours experimenting with different coding challenges, building small projects, and learning new concepts. The thrill of solving problems and creating something from scratch keeps me motivated. I am currently focusing on mastering Python and JavaScript, and I aspire to become a proficient full-stack developer. Coding has opened up a new world of creativity and logic for me, and I am eager to continue this learning adventure.",
        "id": "uuidv4()"
    },
    {
        "username": "Rahul",
        "content": "Hello, I am  Rahul Gupta, and I love to code. Coding has become an integral part of my life, and I find immense joy in solving complex problems and creating innovative solutions. My favorite programming languages are Python and Java, and I enjoy working on projects that challenge my skills and push me to learn more. I am particularly interested in artificial intelligence and machine learning, and I spend a lot of my time exploring these fields. For me, coding is not just a profession but a passion that drives me to constantly improve and stay updated with the latest technological advancements.",
        "id": "uuidv4()"
    }
]


app.get("/posts",(req,res)=>{
   
  // res.send("response send succsfully");
  res.render("index.ejs",{posts});
    
});
app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4()
    posts.push({username,content,id});
   // res.send("It is working")
   res.redirect("/posts")

   // console.log(req.body);
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{
        return p.id==id;
    })
    //console.log(post);
    if(post){
        res.render("SinglePostInDetail.ejs",{post});
    }
    else {
        res.render("Error.ejs");
    }
  
});
app.patch("/posts/:id", (req,res) =>{
    let {id}=req.params;
    let newContent =req.body.content;
    //console.log(newContent);
    let post = posts.find((p)=> id === p.id);
   // console.log(post);
    post.content=newContent;
    console.log(post);
   // res.send("patch request working");
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
   let {id}= req.params;
   
  // console.log(id);
   let post = posts.find((p)=> p.id === id)
  // console.log(post);
   // res.send("it is working");
   res.render("edit.ejs",{post})
    
})
app.delete("/posts/:id",(req,res)=>{
    let {id} =req.params;

    // here filter and store into same array that is array
     posts = posts.filter((p)=> p.id !== id)
  
    //res.send("some")
     res.redirect("/posts");
})




app.listen(port,()=>{
    console.log(`listining on port ${port}`);
})