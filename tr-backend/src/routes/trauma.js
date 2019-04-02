const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Trauma = mongoose.model('Trauma');

router.get('/', (req, res) => {
  res.render('hospital/addOrEdit', {
    viewTitle : "Add Hospital"
  });
});
module.exports = router;
