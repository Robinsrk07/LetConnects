const express = require('express');
const { adminAuth } = require('./middlewares/auth');
const { userAuth } = require('./middlewares/userAuth');
const app= express()



app.get('/admin/abc',(req,res,next)=>{
    cosoe.log("ist");
    //throw new Error('ggg')
   // res.send('admin abc')
})
app.use('/',(err,req,res,next)=>{
    if(err){
        console.log(err);
        res.status(500).send("something went wrong")
    }
})

app.listen(3000)
  