const mongoose = require("mongoose");
require('dotenv').config();


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@nasa.bdwtgy8.mongodb.net/NASA?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, ssl: true});
const db = mongoose.connection;

// Eventos
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to MongoDB established"));

module.exports = mongoose;