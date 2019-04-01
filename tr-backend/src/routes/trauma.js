const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Trauma = mongoose.model('Trauma');

router.get('/', (req, res) => {
    res.render('hospital/addOrEdit', {
        viewTitle : "Add Hospital"
    });
});

module.exports = router;
