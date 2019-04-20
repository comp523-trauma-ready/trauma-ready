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
    const racName = req.params.name;
    RAC
        .findOne({ name : racName })
        .exec((err, docs) => err ? res.json(err) : res.json(docs.activationCodes));
});

// Identifies your RAC by latitude and longitude then returns all associated trauma centers
router.get("/hospitals/:latitude/:longitude", (req, res) => {
    const radius = 100;
    const { latitude, longitude } = req.params;
    if (latitude && longitude) {
        Hospital.find({}, (err, docs) => {
            if (err) res.status(404).send(err);
            let nearby = docs.filter(hospital => (
                Math.abs(hospital.latitude - latitude) < radius
                    && 
                Math.abs(hospital.longitude - longitude) < radius
            ));
            res.json(nearby);
        });
    } else {
        res.status(404).send("Error: latitude and longitude must be provided in url");
    }
});

module.exports = router;