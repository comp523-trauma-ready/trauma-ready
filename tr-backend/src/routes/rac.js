const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const RAC = mongoose.model('RAC');

router.get('/', (req, res) => {
    RAC.find((err, docs) => {
        if (!err) {
            res.render('rac/index', {
                viewTitle: 'Regional Advisory Committees',
                list: docs
            });
        } else {
            console.log(`Error in retrieving RAC list : ${err}`);
        }
    });
});

// GET request based on parameter rid
router.get('/:rid', (req, res) => {
    if(!req.params.rid) {
        return res.status(400).send('Missing URL parameter: RAC ID (rid)')
    }
    RAC.findOne({
        rid: req.params.rid
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
    let newRAC = new RAC(req.body);
    newRAC.save()
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


module.exports = router;