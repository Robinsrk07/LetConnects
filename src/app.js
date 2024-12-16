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
 
app.use(express.json())

app.post('/signup',async(req,res)=>{
 console.log(req.body);
 try{
    const user = new User(req.body)
    await user.save()
    res.send("data recieved")
 }catch(err){
    res.send('error occured :' +err.message)
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
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Send updated user response
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

