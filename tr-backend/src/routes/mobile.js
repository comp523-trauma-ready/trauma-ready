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
        latitude = Math.abs(latitude);      // Handle negative values 
        longitude = Math.abs(longitude);
        Hospital
            .find({})
            .where("latitude").lt(latitude + radius).gt(latitude - radius)
            .where("longitude").lt(longitude + radius).gt(longitude - radius)
            .exec((err, docs) => {
                if (err) res.send(err);
                res.json(docs);
            });
    } else {
        res.status(404).send("Error: latitude and longitude not provided in url");
    }
});

module.exports = router;