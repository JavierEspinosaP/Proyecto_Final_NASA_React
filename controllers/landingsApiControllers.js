const Landing = require('../models/landingModels')

const getLanding = async (req, res) => {

    let minimum_mass = req.query.minimum_mass

    let from = req.query.from
    let to = req.query.to

    const minMassNumber = parseInt(minimum_mass)

    if (minMassNumber) { //FIND BY MIN MASS
        try {
            let landingMinMass = await Landing.getLandingsMinMass(minMassNumber)
            res.status(200).json(landingMinMass);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`)
            res.status(404).json({ "message": "landing not found" });
        }
    }

    else if (from && to) { //FIND BY DATES


        try {
            let landingFromTo = await Landing.getLandingFromTo(from, to)
            res.status(200).json(landingFromTo);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`)
            res.status(404).json({ "message": "landing not found" });
        }
    } else if (from) { //FIND BY DATES

        try {
            let landingFromTo = await Landing.getLandingFrom(from)
            res.status(200).json(landingFromTo);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`)
            res.status(404).json({ "message": "landing not found" });
        }
    } else if (to) { //FIND BY DATES

        try {
            let landingFromTo = await Landing.getLandingTo(to)
            res.status(200).json(landingFromTo);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`)
            res.status(404).json({ "message": "landing not found" });
        }

    }
    else {
        const landings = await Landing.getAllLandings();
        res.status(200).json(landings);
    }
}

const getLandingByMass = async(req, res) => {
    try{
     let landingMass =  await Landing.getLandingMass(req.params.mass);
    res.status(200).json(landingMass)   
    }
    catch {
    console.log(`ERROR: ${error.stack}`)
    res.status(404).json({ "message": "landing not found" });  
    }
}

const getLandingByClass = async(req, res) => {
    try{
     let landingMass =  await Landing.getLandingClass(req.params.class);
    res.status(200).json(landingMass)   
    }
    catch(error){
    console.log(`ERROR: ${error.stack}`)
    res.status(404).json({ "message": "landing not found" });
    }
}


const createLanding = async (req, res) => {
    try{
     let newLanding = await Landing.createLandings(req.body);
    res.status(200).json(newLanding)   
    console.log("Landing saved successfully: ", req.body);
    }
    catch(error){
    console.log(`ERROR: ${error.stack}`)
    res.status(404).json({ "message": "landing not created" });
    }
    
}

const updateLanding = async (req,res)=>{
    try {
  
    await Landing.updateLandings(req.body);
        console.log("esto es req.body", req.body);
        res.send("Landing updated");
    } 
    catch(error){
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "landing not updated" });
        }
}

const deleteLanding = async (req,res)=>{
    try {
        let deleteLanding = req.params.id;
        await Landing.deleteLandings(deleteLanding);
        res.send("Landing deleted");
    }     
    catch(error){
        console.log(`ERROR: ${error.stack}`)
        res.status(404).json({ "message": "landing not deleted" });
        }
}


const landingControllers = {
    getLanding,
    getLandingByMass,
    getLandingByClass,
    createLanding, 
    updateLanding,
    deleteLanding
}

module.exports = landingControllers;