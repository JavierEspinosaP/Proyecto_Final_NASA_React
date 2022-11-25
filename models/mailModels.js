const User = require('../schemas/userSchemas')


const changePassword = async (user) =>{

    console.log("esto es user", user);
    try{
    const updateEmail = await User.findOneAndUpdate({email: user.email}, {$set: {password:user.password}}) 
    // console.log("esto es user", user);  
    // console.log(updateEmail);    
    }
    catch(e){
        console.log(e); 
    }
}

module.exports = {changePassword}