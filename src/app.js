const express = require('express');
 const ConnectDb =  require('./config/database')
 var jwt = require('jsonwebtoken');
 const app = express();
var cookieParser = require('cookie-parser')
const bcrypt =require('bcrypt')
const User =require('./model/userSchema')
const {validateSignUpdata}= require('./utils/validation')
ConnectDb().then(()=>{
    console.log("database Connection succes");
    app.listen(3000,()=>{
        console.log("server connected");
        
    })
    
})
 
app.use(express.json())
app.use(cookieParser())

app.post('/signup',async(req,res)=>{
 console.log(req.body);
 try{
    validateSignUpdata(req)

   const {firstName,lastName,emailId,password} = req.body

   const passwordHash = await bcrypt.hash(password,10)
   console.log(passwordHash);

   const user = new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash
  })
   
    await user.save()  
    res.send("data recieved")
 }catch(err){
    res.send('error occured :' +err.message)
 }
})


app.post('/login',async(req,res)=>{
try{
const {emailId,password}=req.body;
const user = await User.findOne({emailId:emailId})

if(!user){
    throw new Error("invalid credentials");
}

const isPasswordValid = await bcrypt.compare(password,user.password)

if(isPasswordValid){

const token = await jwt.sign({_id:user._id},'ROBIN@123')

console.log(token);


 
    res.cookie("token",token) 
    res.send(" its a valid user")
}else{
    res.send("invalid credentials")
}

}catch(err){
console.log("error occured"+err.message);
res.status(400).send("invalid credentials")
}
})

app.get('/profile',async(req,res)=>{
    try{
    const cookie = req.cookies;
    console.log(cookie);
    const{token} =cookie
    if(!token){
        throw new Error("invalid token")
    }
    const decode= await jwt.verify(token,"ROBIN@123");
    console.log(decode);
    const {_id} = decode
    console.log("My logged in user is :"+_id);
    const user = await User.findById(_id)
    if(!user){
        throw new Error("invalid user")
    }
    res.send(user)
    }catch(err){
        res.status(400).send("ERROR:"+err.message)
    }
})

 
app.get('/user',async(req,res)=>{
    const userEmail = req.body.emailId
    console.log("userEmail:",userEmail);
    
    try{
        const user = await User.findOne({emailId:userEmail})
        console.log(user);
        
        res.send(user)
    }catch(err){
        res.send("somethig send wrong")
    }
})

app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    console.log(data);

    try {
       
        const Allowed_updates = [
            "firstName", "lastName", "age", "gender", "about", "skills","userId"
        ];

        
        const isAllowedUpdates = Object.keys(data).every((k) => Allowed_updates.includes(k));
        
        if (!isAllowedUpdates) {
            throw new Error("Update not allowed: Invalid fields");
        }
        if(data?.skills.length >10){
            throw new Error(' ')
        }

       
        const user = await User.findByIdAndUpdate(
            { _id: userId },  
            data,              
            { new: true, runValidators: true } 
        );

        
        if (!user) {
            return res.status(404).send("User not found");
        }

        
        res.status(200).json(user);

    } catch (err) {
        console.error(err);
        res.status(400).send("Update failed: " + err.message);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong");
});

