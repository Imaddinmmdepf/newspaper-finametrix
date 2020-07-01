const mongoose = require('mongoose');

let archivedNewModel = mongoose.model('ArchivedNew', 
{
    title: {type:String},
    description: {type : String},
    contentType: {type : String},
    createdAt: {type : Date, default: Date.now()},
    author: {type : String},
    archivedAt: {type: Date, default: Date.now()}
    

})

module.exports = { archivedNewModel };