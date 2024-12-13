const express = require('express')
const app= express()

app.get('/ab*c',(req,res,next)=>{
    console.log("ist");
    
    next()
   
   
},
(req,res,next)=>{
    console.log("2nd");
    
   next()
},
(req,res,next)=>{
    console.log("3nd");
    next()
   
},
(req,res)=>{
    console.log("4nd");
    

},
)
app.get('/test',(req,res)=>{
    console.log('postman');
    res.send('Response')
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
  