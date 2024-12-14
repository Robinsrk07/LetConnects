
const mongoose = require('mongoose');


const ConnectDb = async () => {
    
        await mongoose.connect("mongodb+srv://ROBINSRK:ROBINSRK123@letsconnect.z1hp8.mongodb.net/?retryWrites=true&w=majority&appName=LetsConnect", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
       
    } 


module.exports= ConnectDb;