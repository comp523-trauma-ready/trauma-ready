const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Activations = mongoose.model('Activations');

module.exports = router;
