const userAuth= (req,res,next)=>{
    console.log("user authentication");

    const token ="abc"
    const isUserAuthenticated =token==="abc";
    if(!isUserAuthenticated){
        res.status(401).send("unAuthorised user")
    }else{
        next()
    }
    
}

module.exports = {userAuth}