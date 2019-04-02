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

module.exports = router;
