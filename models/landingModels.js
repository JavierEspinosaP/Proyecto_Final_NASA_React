
const Landing = require('../schemas/landingSchemas')

const getAllLandings = async () => {
    try{
        const getLandings = await Landing.find({},"-_id");
        return getLandings
    }
    catch(err){
        console.error(err);
    }
}


const getLandingsMinMass = async (minMassNumber)=> {
    try{
        const getLandingsMinMass = await Landing.find({mass: {$gt:minMassNumber}}, "id mass -_id")
        console.log(typeof minMassNumber);
        return getLandingsMinMass  
    }
 catch(err){
    console.error(err);
}}

const getLandingMass = async (mass) => {
    try {
  
        const getLandingsByMass = await Landing.find({mass: mass}, "name mass -_id")
        return getLandingsByMass
    }
    catch(err){
    console.error(err);
}}

const getLandingClass = async (clase) => {
    try {
  
        const getLandingsByClass = await Landing.find({recclass: clase}, "name recclass -_id")
        return getLandingsByClass
    }
    catch(err){
    console.error(err);
}}


const getLandingFrom = async (from) => {
    try {
    const landingFromTo = await Landing.find({year:{$gt:from}})//Buscar desde un año concreto
    return landingFromTo
    }
    catch(err){
        console.error(err); 
    }
}

const getLandingTo = async (to) => {
    try {
    const landingFromTo = await Landing.find({year:{$lt:to}})//Buscar hasta un año concreto
    return landingFromTo
    }
    catch(err){
        console.error(err); 
    }
}

const getLandingFromTo = async (from, to) => {
    try {
    const landingFromTo = await Landing.find({year:{$gt:from, $lt:to}})//Buscar entre un año y otro
    return landingFromTo
    }
    catch(err){
        console.error(err); 
    }
}

const createLandings = async (landing) => {

try{let newLanding = new Landing(landing) //Crear el objeto landing
    let answer = await newLanding.save() //Guardar objeto en Mondodb
    console.log("Este es el console.log de lo que devuelve la api",answer);
    return {Answer:"Landing created",
    Landing: answer}
}
catch(error){
    console.log(`ERROR:${error}`)
}}

const updateLandings = async (landing) => {
    try {
        const newLanding = {
            "id": landing.id,
            "name": landing.name,
            "nametype": landing.nametype,
            "recclass": landing.recclass,
            "mass": landing.mass,
            "fall": landing.fall,
            "year": landing.year,
            "reclat": landing.reclat,
            "reclong": landing.reclong,
            "geolocation": landing.geolocation
        } //Landing del body
        console.log("esto es newLanding: ", newLanding);
        const oldLanding = await Landing.findOneAndUpdate({id: landing.id}, newLanding); //Busqueda del landing por id
        oldLanding.overwrite(newLanding);//Edicion del landing
        console.log("esto es oldLanding despues de overwrite", oldLanding);
        await oldLanding.save();//Guardar nuevo landing
        return {Answer: "Landing Updated",
                Landing: oldLanding}
    } catch (error) {
        console.log(error);
    }
};

const deleteLandings = async (landing) => {
    try {
        let answer = await Landing.deleteOne({id: landing.id})
        console.log("Este es el console.log de lo que devuelve la api",answer);
        return `Landing with id ${landing.id} deleted`
    }
  catch(error){
    console.log(`ERROR:${error}`)
}}


module.exports = {
    getAllLandings,
    getLandingsMinMass,
    getLandingFrom,
    getLandingTo, 
    getLandingFromTo,
    getLandingMass,
    getLandingClass,
    createLandings,
    updateLandings,
    deleteLandings
}