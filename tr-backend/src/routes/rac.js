const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RAC = mongoose.model('RAC');

router.get('/', (req, res) => {
    RAC.find((err, docs) => {
        if (!err) {
            res.render('rac/index', {
                viewTitle: 'Regional Advisory Committees',
                list: docs
            });
            //console.log(docs);
        } else {
            console.log(`Error in retrieving RAC list : ${err}`);
        }
    });
});

module.exports = router;
