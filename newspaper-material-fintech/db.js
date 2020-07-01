const mongoose = require('mongoose');
const dotenv = require('dotenv').config(); 


const uri = process.env.ATLAS_URI;


mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology: true}, err => {
    if(err) console.log("Error al conectar con mongodb"  + JSON.stringify(err, undefined, 2));
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Mongodb database connection was established')
});
