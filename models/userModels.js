
const User = require('../schemas/userSchemas')

const getAllUsers = async () => {
    try {
        const getUser = await User.find({}, "-_id");
        return getUser
    }
    catch (err) {
        console.error(err);
    }
}

const getUserByMail = async (userEmail) => {
    try {
        const getUserByMail = await User.find({email: userEmail}, "-_id")
        return getUserByMail
    }
    catch(err){
    console.error(err);
}}


const createUsers = async (user) => {

    try {
        let newUser = new User(user) //Crear el objeto user
        console.log(newUser);
        let answer = await newUser.save() //Guardar objeto en Mondodb
        // console.log("Este es el console.log de lo que devuelve la api",answer);
        return {
            Answer: "User created",
            User: answer
        }
    }
    catch (error) {
        console.log(`ERROR:${error}`)
    }
}

const updateUsers = async (user) => {
    try{
        const newUser = {
            "name": user.name,
            "nickname": user.nickname,
            "email":user.email,
            "picture": user.picture,
            "affiliatedNumber": user.affiliatedNumber,
            "affiliationDate": user.affiliationDate,
            "occupation": user.occupation,
            "birthdate": user.birthdate,
            "neas_discovered": user.neas_discovered
        }
        const oldUser = await User.findOneAndUpdate({email: user.email}, newUser); //Busqueda del user por email
        oldUser.overwrite(newUser);//Edicion del Neas
        console.log("esto es oldUser despues de overwrite", oldUser);
        await oldUser.save();//Guardar nuevo Neas
        return {Answer: "User Updated",
                User: oldUser}
    } catch (error) {
        console.log(error);
    }
    }

const deleteUsers = async (user) => {
    try {
        let answer = await User.deleteOne({email: user.email})
        console.log("Este es el console.log de lo que devuelve la api",answer);
        return `Landing with id ${user.email} deleted`
    }
  catch(error){
    console.log(`ERROR:${error}`)
}}



module.exports = {
    getAllUsers,
    getUserByMail,
    createUsers,
    updateUsers,
    deleteUsers
}