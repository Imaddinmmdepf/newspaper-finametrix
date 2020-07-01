const mongoose = require('mongoose');

let postNewModel = mongoose.model('postnews', 
{
    title: {type:String},
    description: {type : String},
    contentType: {type : String},
    createdAt: {type : Date, default: Date.now()},
    author: {type : String},
    archivedAt: {type: Date, default: null},
    

}, 'postnews')

module.exports = { postNewModel };