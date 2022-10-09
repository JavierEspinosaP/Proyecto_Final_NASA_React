const Nea = require('../models/neasModels')

const getNeas = async (req, res) => {


    let orbitClass = req.query.class
    let date = req.query.date
    let designation = req.query.designation
    let from = req.query.from
    let to = req.query.to

    // const minMassNumber = parseInt(minimum_mass)

    if (orbitClass) { //FIND BY ORBIT CLASS
        try {
            let NeaByClass = await Nea.getNeasByOrbitClass(orbitClass)
            res.status(200).json(NeaByClass);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`)
            res.status(404).json({ "message": "Nea not found" });
        }
    }

    else if(designation){
        try {
            let NeaByDesignation = await Nea.getNeasByDesignation(designation)
            res.status(200).json(NeaByDesignation);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`)
            res.status(404).json({ "message": "Nea not found" });
        }
    }

    else if (from && to) { //FIND BY DATES

        try {
            let NeaFromTo = await Nea.getNeasFromTo(from, to)
            res.status(200).json(NeaFromTo);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`)
            res.status(404).json({ "message": "Nea not found" });
        }
    } else if (from) { //FIND BY DATES

        try {
            let neaFromTo = await Nea.getNeasFrom(from)
            res.status(200).json(neaFromTo);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`)
            res.status(404).json({ "message": "Nea not found" });
        }
    } else if (to) { //FIND BY DATES

        try {
            let neaFromTo = await Nea.getNeasTo(to)
            res.status(200).json(neaFromTo);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`)
            res.status(404).json({ "message": "Nea not found" });
        }
    }
    else if (date) { //FIND BY ESPECIFIC DATE

        try {
            let neaDate = await Nea.getNeasByDate(date)
            res.status(200).json(neaDate);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`)
            res.status(404).json({ "message": "Nea not found" });
        }

    }
    else {
        const Neas = await Nea.getAllNeas();
        res.status(200).json(Neas);
    }
}

const getNeaByMass = async (req, res) => {
    try {
        let NeaMass = await Nea.getNeaMass(req.params.mass);
        res.status(200).json(NeaMass)
    }
    catch {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Nea not found" });
    }
}

const getNeaByClass = async (req, res) => {
    try {
        let NeaMass = await Nea.getNeaClass(req.params.class);
        res.status(200).json(NeaMass)
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Nea not found" });
    }
}


const createNeas = async (req, res) => {
    try {
        let newNea = await Nea.createNea(req.body);
        res.status(200).json(newNea)
        console.log("Nea saved successfully: ", req.body);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Nea not created" });
    }

}

const updateNeas = async (req, res) => {
    try {

        await Nea.updateNea(req.body);
        console.log("esto es req.body", req.body);
        res.send("Nea updated");
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Nea not updated" });
    }
}

const deleteNeas = async (req, res) => {
    try {
        await Nea.deleteNea(req.body);
        res.send("Nea deleted");
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "Nea not deleted" });
    }
}


const NeaControllers = {
    getNeas,
    getNeaByMass,
    getNeaByClass,
    createNeas,
    updateNeas,
    deleteNeas
}

module.exports = NeaControllers;