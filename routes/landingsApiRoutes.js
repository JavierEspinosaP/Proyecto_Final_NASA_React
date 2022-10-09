//Rutas de landings
const express = require('express')
const landingsApiControllers = require("../controllers/landingsApiControllers");
const landingsApiRouter = express.Router();

// landings API

landingsApiRouter.get('/astronomy/landings', landingsApiControllers.getLanding)
landingsApiRouter.get('/astronomy/landings/mass/:mass', landingsApiControllers.getLandingByMass)
landingsApiRouter.get('/astronomy/landings/class/:class', landingsApiControllers.getLandingByClass)
landingsApiRouter.post('/astronomy/landings/create', landingsApiControllers.createLanding)
landingsApiRouter.put('/astronomy/landings/update/:id', landingsApiControllers.updateLanding)
landingsApiRouter.delete('/astronomy/landings/delete/:id', landingsApiControllers.deleteLanding)

module.exports = landingsApiRouter;