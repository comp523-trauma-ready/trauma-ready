const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Trauma = mongoose.model('Trauma');

router.get('/', (req, res) => {
    Trauma.find((err, docs) => {
        if (!err) {
            res.render('trauma/index', {
                viewTitle: 'Trauma',
                list: docs
            });
            //console.log(docs);
        } else {
            console.log(`Error in retrieving trauma list : ${err}`);
        }
    });
});
module.exports = router;
