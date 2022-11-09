const User = require('../models/userModels')
const bcrypt = require('bcryptjs')

const getUser = async (req, res) => {

    let userEmail = req.query.email

    if (userEmail) { //FIND BY MAIL
        try {
            let userByMail = await User.getUserByMail(userEmail)
            res.status(200).json(userByMail);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`)
            res.status(404).json({ "message": "user not found" });
        }
    }
    else {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    }
}

const getOneUser = async (req, res) => {

    let userEmail = req.params.nickname

        const users = await User.getUserByNickname(userEmail);
        res.status(200).json(users);
    
}

const createUser = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10)
    const nickname = req.body.nickname
    const email = req.body.email
    const user = {nickname, email, password}
    try{
     let newUser = await User.createUsers(user);
    res.status(200).json(newUser)   
    }
    catch(error){
    console.log(`ERROR: ${error.stack}`)
    res.status(400).json({ "message": "user not created" });
    }
    
}

const updateUser = async (req,res) => {
    try {
  
        await User.updateUsers(req.body);
            console.log("esto es req.body", req.body);
            res.send("User updated");
        } 
        catch(error){
            console.log(`ERROR: ${error.stack}`)
            res.status(404).json({ "message": "User not updated" });
            }
    }

const deleteUser = async (req, res) => {
    try {
        await User.deleteUsers(req.body);
        res.status(200).json({ "message": "User deleted"})
    }
    catch(error){
        console.log(`ERROR: ${error.stack}`)
            res.status(404).json({ "message": "User not deleted" });
            }
    
}



const loginUser = async (req,res) => {
    try {
        await User.signInUser(req.body);
        res.status(200).json({"message": "User logged"})
    }
    catch(e){
        console.log(`Error: ${e.stack}`)
        res.status(404).json({"message": "Login error"})
    }
}

const logoutUser = async (req,res) => {
    try {
        await User.signOutUser(req.body);
        res.status(200).json({"message": "Logout User"})
    }
    catch(e){
        console.log(`Error: ${e.stack}`)
        res.status(404).json({"message": "Logout error"})
    }
}

const UserControllers = {
    getUser,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser
}

module.exports = UserControllers;