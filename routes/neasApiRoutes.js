//Rutas de neas
const express = require('express')
const neasApiController = require("../controllers/neasApiControllers");
const neasApiRouter = express.Router();

// neas API

neasApiRouter.get('/astronomy/neas', neasApiController.getNeas);
neasApiRouter.post('/astronomy/neas/create', neasApiController.createNeas)
neasApiRouter.put('/astronomy/neas/edit', neasApiController.updateNeas)
neasApiRouter.delete('/astronomy/neas/delete/:designation?', neasApiController.deleteNeas)

module.exports = neasApiRouter;