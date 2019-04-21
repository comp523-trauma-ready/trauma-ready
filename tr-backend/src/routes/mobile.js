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
            ))
            res.json(nearby);
        });
    } else {
        res.status(404).send("Error: latitude and longitude must be provided in url");
    }
});

// The same as the last route, but more sophisticated calculations
// Reference: http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates
router.get("/hospitals/full/:latitude/:longitude", (req, res) => {
    let { latitude, longitude } = req.params;
    const R = 6371; // https://en.wikipedia.org/wiki/Great-circle_distance
    const range = 100; // 75 kilometer circular radius 
    Hospital
        .find({})
        .sort("name hid latitude longitude")
        .exec((err, docs) => {
            if (err) {
                res.status(404).send(err);
            }
            const ulat = latitude * Math.PI / 180;
            const ulong = longitude * Math.PI / 180;
            // All in kilometers
            const distances = docs.map((hospital) => {
                const hlat = hospital.latitude * Math.PI / 180;
                const hlong = hospital.longitude * Math.PI / 180;
                const dist = R * (Math.acos(Math.sin(ulat)*Math.sin(hlat) + Math.cos(ulat)*Math.cos(hlat)*Math.cos(ulong - hlong))); 
                console.log(dist);
                return ({...hospital, ...{distance: dist}})
            });
            res.send(distances.filter(h => h.distance < range));
        });
});

module.exports = router;