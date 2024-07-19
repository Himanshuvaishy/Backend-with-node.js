const mongoose = require('mongoose');




      async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
      }
      main()
     .then(()=>{
        console.log("connection stabled with db");
     })
      .catch((err) =>{
       console.log(err);
      });
        // creating schema
      const userSchema = new mongoose.Schema({
        name:String,
        email:String,
        age:Number
      });
      // creating model
     // model is a class
      const User= mongoose.model("User",userSchema);

      
      // we can assume that User is looks like a collection and where user1 is a document
    
      // Inserting One Document in collection
      const user1=new User({
        name:"Himanshu",
        email:"123@gmail.com",
        age:32
      });
      // it is used to save document in our collection
     // user1.save();

      const user2=new User({
        name:"Himanshu gupta",
        email:"abc@gmail.com",
        age:25
      });
     // user2.save();
     const user3=new User({
      name:"Himanshu vaishy",
      email:"vaishhimanshu83170@gmail.com",
      age:25
    });

    // save method return promise
   // user3.save()
    // .then((res)=>{
    //   console.log(res);
    // })
    // .catch((err)=>{
    //   console.log(err);
    // })


    // insert Many

    User.insertMany([
           {
            name: "yashi",
            email: "vaish@gmail.com",
            age: 34
          },
          {
            name: "yashi gupta",
            email: "vaishh@gmail.com",
            age: 31
          }
    ]).then((res)=>{
      //console.log(res);
    })

   

// Yes, Mongoose uses operation buffering,

//  which allows you to perform database operations even before the connection to the database is established. These operations are queued and executed once the connection is available. However, ensuring the connection is properly handled is still important. Here's a more complete example that includes connecting to the database and handling the insertion of multiple documents:
  

// find operation

console.log(User.find());