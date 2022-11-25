//Rutas de maal
const express = require('express')
const mailApiControllers = require("../controllers/mailApiControllers");
const mailApiRouter = express.Router();

// mail API

mailApiRouter.post('/mailrecover', mailApiControllers.recoverMail)


module.exports = mailApiRouter;