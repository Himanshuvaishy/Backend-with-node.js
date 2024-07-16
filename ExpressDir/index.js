  const exp = require("express");

    const app =exp();
    let port=3000;

    // server start to listen in the post 3000
    app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
  });

  // it is confirmation for that server received request and  sending response by using res arguments
 ////// app.use((req,res)=>{
   // console.log("request received");
    //console.log(req);
  //  res.send("this is a string response")
 // })




 // routing 

app.get("/",(req,res) =>{
    console.log("request received");
    res.send("root path")

});

app.get("/home",(req,res) =>{
    console.log("request received");
    res.send("you connected home path")

})

app.get("/search",(req,res)=>{
    console.log("request received");
    res.send("you connected search path ")
})


// // nodemon 

// //To automatically restart with code changes

 
// app.get("/:username/:id",(req,res)=>{
//     console.log(req.params);
//     const { username,id}=req.params;
//     res.send(`this is dynamic response come from ${username} page and it's id is ${id}`);
// }) 

// // query string manage

app.get("/:search1",(req,res)=>{
    console.log(req.query);
    let { fruit,q }=req.query;

    res.send(`this is response send in query : ${q} and ${fruit} `) 

})

// if route does not match any route which we mentiond above then it automatcally send res.
app.get("*",(req,res)=>{
    res.send("this page is not valid")
})
