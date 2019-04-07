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

module.exports = router;
