const express = require('express');

const mongoose = require('mongoose');
const router = express.Router();

const Activations = mongoose.model('Activations');

router.get('/', (req, res) => {
    Activations.find((err, docs) => {
        if (!err) {
            res.render('activations/index', {
                viewTitle: 'Activations',
                list: docs
            });
            //console.log(docs);
        } else {
            console.log(`Error in retrieving activations list : ${err}`);
        }
    });
});

router.get('/:aid', (req, res) => {
    if(!req.params.aid) {
        return res.status(400).send('Missing URL parameter: activation id (aid)')
    }
    Activations.findOne({
        aid: req.params.aid
    })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(404).json(err);
        });
});

router.post('/', (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request body is missing');
    }
    let newActivation = new Activations(req.body);
    newActivation.save()
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

router.put('/:aid', (req, res) => {
    if(!req.params.aid) {
        return res.status(400).send('Missing URL parameter: activation id (aid)');
    }
    Activations.findOneAndUpdate({
        aid: req.params.aid}, req.body, {new: true})
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.delete('/:aid', (req, res) => {
    if(!req.params.aid) {
        return res.status(400).send('Missing URL parameter: activation id (aid)');
    }
    Hospital.findOneAndRemove({
        aid: req.params.aid})
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


module.exports = router;
