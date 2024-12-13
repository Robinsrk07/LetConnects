const express = require('express')
const app= express()

app.get('/ab*c',(req,res)=>{
    res.send('****')
})
app.get('/test/:userId/:name',(req,res)=>{
    res.send('ostman')
} )

app.post('/user',(req,res)=>{
    console.log("save data from database");
    res.send('data succesfully saved')
    
})
app.use('/hello',(req,res)=>{
    res.send('hello')
})
 
// app.use('/',(req,res)=>{
//     res.send('landing')
// })
app.listen(3000)
  