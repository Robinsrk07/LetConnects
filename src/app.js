const express = require('express');
 const ConnectDb =  require('./config/database')
const app = express();
const User =require('./model/userSchema')
ConnectDb().then(()=>{
    console.log("database Connection succes");
    app.listen(3000,()=>{
        console.log("server connected");
        
    })
    
})


app.post('/signup',async(req,res)=>{
 const userObj = {
    firstName:"robin",
    lastName:"Syriak",
    email:"Robinsyriak07@gmail.com",
    password :"robinsrk@123"
 }
    const user = new User(userObj)
    await  user.save().then(()=>{
        console.log("user saved Succesfully");
        res.send("user added succefully")
        
    }).catch((err)=>{
        console.log(err);
        res.send("error")
        
    })

})

// Error handling middleware (should be last)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong");
});

