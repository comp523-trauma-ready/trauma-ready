const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Trauma = mongoose.model('Trauma');

// Must be logged-in/authenticated to POST, PUT or DELETE
const { ensureAuthenticated } = require('../config/auth');

// http://statt-portal.herokuapp.com/trauma
// Generates the table of traumas
router.get('/', (req, res) => {
    Trauma.find((err, docs) => {
        if (!err) {
            res.render('trauma/index', {
                viewTitle: 'Trauma',
                list: docs
            });
            console.log(docs);
        } else {
            console.log(`Error in retrieving trauma list : ${err}`);
        }
    });
});

// http://statt-portal.herokuapp.com/trauma/:tid
// Generates the trauma in json format matching the id
router.get('/:tid', (req, res) => {
    if(!req.params.tid) {
        return res.status(400).send('Missing URL parameter: trauma id (tid)')
    }
    Trauma.findOne({
        tid: req.params.tid
    })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(404).json(err);
        });
});

// Creates a new trauma document
router.post('/', ensureAuthenticated, (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request body is missing');
    }
    let newTrauma = new Trauma(req.body);
    newTrauma.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                return res.status(500).send(doc);
            }

            res.status(201).send(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Updates an existing Trauma document
router.put('/:tid', ensureAuthenticated, (req, res) => {
    if(!req.params.tid) {
        return res.status(400).send('Missing URL parameter: trauma id (tid)');
    }
    Trauma.findOneAndUpdate({
        tid: req.params.tid}, req.body, {new: true})
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

// Deletes an existing Trauma document
router.delete('/:tid', ensureAuthenticated, (req, res) => {
    if(!req.params.tid) {
        return res.status(400).send('Missing URL parameter: trauma id (tid)');
    }
    Trauma.findOneAndRemove({
        tid: req.params.tid})
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;