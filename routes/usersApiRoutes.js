//Rutas de users
const express = require('express')
const usersApiControllers = require("../controllers/usersApiControllers");
const usersApiRouter = express.Router();

// users API

usersApiRouter.get('/users', usersApiControllers.getUser)
usersApiRouter.get('/users/:nickname', usersApiControllers.getOneUser)
usersApiRouter.post('/users/create', usersApiControllers.createUser)
usersApiRouter.put('/users/login', usersApiControllers.loginUser)
usersApiRouter.put('/users/logout', usersApiControllers.logoutUser)
usersApiRouter.put('/users/edit', usersApiControllers.updateUser)
usersApiRouter.delete('/users/delete', usersApiControllers.deleteUser)


module.exports = usersApiRouter;