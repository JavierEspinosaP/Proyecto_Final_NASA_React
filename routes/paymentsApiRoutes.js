//Rutas de pagos
const express = require('express')
const paymentsApiControllers = require("../controllers/paymentsApiControllers");
const paymentsApiRouter = express.Router();


paymentsApiRouter.post('/checkout', paymentsApiControllers.checkout)

module.exports = paymentsApiRouter