const express = require('express');
const router = express.Router();
const objectID = require('mongoose').Types.ObjectId

let { postNewModel }=  require('../models/postNew');
let { archivedNewModel } = require('../models/archivedNew');

router.get('/', (req, res) => {
    postNewModel.find((err,docs) => {
        if(!err) res.send(docs)
        else console.log('Error while retrieving all resources' + JSON.stringify(err, undefined, 2));    
    });

});

router.post('/', (req, res) => {
    
    let newPost =  createApost(req);

    newPost.save((err, doc) => {
        if(!err) {
            res.send(doc)
            console.log('insertado');
        }else{
            console.log("Error while saving the newPost" + JSON.stringify(err,undefined, 2));
        }
    });
});
router.put('/:id', (req, res) => {
    if(!objectID.isValid(req.params.id))
        res.status(400).send('No record with given id: ' + req.params.id);
    let updatedPost = {
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            contentType: req.body.contentType,
            createdAt: Date.now(),
    }
    console.log(updatedPost)
    postNewModel.findByIdAndUpdate(req.params.id, {$set: updatedPost}, {new:true},(err,doc) => {
        if (!err) res.send(doc);
        else console.log("Error while updating a record " + JSON.stringify(err,undefined, 2));
    });
});

router.delete('/:id', (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    archivedNewModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/archived/:id', (req, res) => {
    if(!objectID.isValid(req.params.id))
        return res.status(400).send('No record with given id: '+ req.params.id);
    postNewModel.findByIdAndDelete(req.params.id, (err, doc) => {
        if(!err) {
           let archivedDocument = updateArchivedAt(doc);
           archivedDocument.save((err, documentSaved) => {
                if(!err) res.send(documentSaved);
                else console.log("Error while saving doc archived: " + err);
           });
           
        }
        else console.log("Error while updating a record : " + JSON.stringify(err,undefined,2));
    });
    
});

router.get('/archived', (req, res) => {
    archivedNewModel.find().sort([['archivedAt', 'descending']]).exec((err, doc) => {
        if(!err) res.send(doc)
        else console.log('Error while retrieving all resources' + JSON.stringify(err, undefined, 2));   
    });
})

function createApost(req) {
    let newPost =  new postNewModel({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        contentType: req.body.contentType,
        createdAt: Date.now(),
    })
    console.log(req);
    return newPost;
}
function updateArchivedAt(doc){
    let archived_document = new archivedNewModel({
        
        title: doc.title,
        description: doc.description,
        author: doc.author,
        contentType: doc.contentType,
        createdAt: doc.createdAt,
        archivedAt: Date.now(),
    
    });
    console.log(archived_document.archivedAt.toString());

    return archived_document;
}

module.exports = router;