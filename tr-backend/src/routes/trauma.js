const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Trauma = mongoose.model('Trauma');

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

router.post('/', (req, res) => {
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

router.put('/:tid', (req, res) => {
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

router.delete('/:tid', (req, res) => {
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