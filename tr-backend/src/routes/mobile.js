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
        .exec((err, docs) => {
            return err ? res.json(err) : res.json(docs);
        });
});

// Return 
router.get("/activations/:rac", (req, res) => {
    let racName = req.params.rac;

});

module.exports = router;