const Nea = require('../schemas/neaSchemas')

const getAllNeas = async () => {
    try{
        const getNeas = await Nea.find({},"-_id");
        return getNeas
    }
    catch(err){
        console.error(err);
    }
}


const getNeasByOrbitClass = async (orbitClass)=> {
    try{
        const getNeasByOClass = await Nea.find({orbit_class: orbitClass}, "designation period_yr -_id")
        return getNeasByOClass
    }
 catch(err){
    console.error(err);
}}

const getNeaMass = async (mass) => {
    try {
  
        const getNeaByMass = await Nea.find({mass: mass}, "name mass -_id")
        return getNeaByMass
    }
    catch(err){
    console.error(err);
}}

const getNeaClass = async (clase) => {
    try {
  
        const getNeaByClass = await Nea.find({recclass: clase}, "name recclass -_id")
        return getNeaByClass
    }
    catch(err){
    console.error(err);
}}


const getNeasFrom = async (from) => {
    try {
    const NeasFromTo = await Nea.find({year:{$gt:from}})//Buscar desde un año concreto
    return NeasFromTo
    }
    catch(err){
        console.error(err); 
    }
}

const getNeasTo = async (to) => {
    try {
    const NeasFromTo = await Neas.find({year:{$lt:to}})//Buscar hasta un año concreto
    return NeasFromTo
    }
    catch(err){
        console.error(err); 
    }
}

const getNeasFromTo = async (from, to) => {

    try {
    const NeasFromTo = await Nea.find({year:{$gt:from, $lt:to}})//Buscar entre un año y otro
    return NeasFromTo
    }
    catch(err){
        console.error(err); 
    }
}

const getNeasByDate = async (date) => {
    
    try {
    const NeasByDate = await Nea.find({discovery_date:{$regex: date, $options: 'i'}})//Buscar por fecha especifica
    return NeasByDate
    }
    catch(err){
        console.error(err); 
    }
}

const createNea = async (nea) => {

try{let newNea = new Nea(nea) //Crear el objeto Neas
    let answer = await newNea.save() //Guardar objeto en Mondodb
    console.log("Este es el console.log de lo que devuelve la api",answer);
    return {Answer:"Nea created",
    Nea: answer}
}
catch(error){
    console.log(`ERROR:${error}`)
}}

const updateNea = async (nea) => {
    try {
        const newNea = {
            "designation": nea.designation,
            "discovery_date": nea.discovery_date,
            "h_mag": nea.h_mag,
            "moid_au": nea.moid_au,
            "q_au_1": nea.q_au_1,
            "q_au_2": nea.q_au_2,
            "period_yr": nea.reclat,
            "i_deg": nea.i_deg,
            "pha": nea.pha,
            "orbit_class": nea.orbit_class
        } //Neas del body
        console.log("esto es newNeas: ", newNea);
        const oldNea = await Nea.findOneAndUpdate({designation: nea.designation}, newNea); //Busqueda del Neas por designation
        oldNea.overwrite(newNea);//Edicion del Neas
        console.log("esto es oldNeas despues de overwrite", oldNea);
        await oldNea.save();//Guardar nuevo Neas
        return {Answer: "Neas Updated",
                Neas: oldNea}
    } catch (error) {
        console.log(error);
    }
};

const deleteNea = async (nea) => {
    try {
        let answer = await Nea.deleteOne({designation: nea.designation})
        console.log("Este es el console.log de lo que devuelve la api",answer);
        return `Nea with designation ${nea.designation} deleted`
    }
  catch(error){
    console.log(`ERROR:${error}`)
}}


module.exports = {
    getAllNeas,
    getNeasByOrbitClass,
    getNeasFrom,
    getNeasTo, 
    getNeasFromTo,
    getNeasByDate,
    getNeaMass,
    getNeaClass,
    createNea,
    updateNea,
    deleteNea
}