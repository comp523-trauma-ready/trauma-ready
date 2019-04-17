const express = require("express");

const mongoose = require("mongoose");
const router = express.Router();

const Activations = mongoose.model("Activations");
const Hospital = mongoose.model("Hospital");
const RAC = mongoose.model("RAC");

// Returns all hospitals as JSON for loading into the directory screen 
router.get("/hospitals", (req, res) => {
    Hospital
        .find({})
        .sort("name")
        .exec((err, docs) => err ? res.json(err) : res.json(docs));
});

// Returns all activation codes for a given RAC name
router.get("/rac/:name", (req, res) => {
    let racName = req.params.name;
    RAC
        .findOne({ name : racName })
        .exec((err, docs) => err ? res.json(err) : res.json(docs.activationCodes));
});

module.exports = router;