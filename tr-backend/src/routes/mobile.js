const express = require("express");

const mongoose = require("mongoose");
const router = express.Router();

const Activations = mongoose.model("Activations");
const Hospital = mongoose.model("Hospital");
const RAC = mongoose.model("RAC");


// URL: 
//      localhost:3000/mobile/dir/alpha
//
// Gets all hospitals and their associated activations and returns them
// in ascending alphabetical order.
//
// Returns:
//      - 500 on network error
//      - 200 + [{ hid, name, rac, [{activationId, activationName}] }]

router.get("/dir/alpha", (req, res) => {
    Hospital
        .find({})
        .select("hid name rac")
        .sort("name")
        .exec((err, docs) => {
            if (err) res.json(err);
            // Here we'd want to get all the associated activations, but haven't 
            // figured out how to handle the asynchronous request in a loop yet
            res.send(JSON.stringify(docs,null,2));
        });
});

// URL: 
//      localhost:3000/mobile/dir/rac
//
// Gets all hospitals organized hierarchically by RAC
//
// Returns:
//      - 500 on network error
//      - 200 + [rac : [{hid, hname}]]

//router.get("/dir/rac", (req, res) => {
//    let responseData = [];
//    RAC.find({})
//        .select("name")
//        .exec((err, docs) => {
//            if (err) res.json(err);
//            for (let i = 0; i < docs.length; i++) {
//                let racName = docs[i]["name"];
//                Hospital.find({ rac : racName })
//                    .select("hid name")
//                    .exec(err, docs) => {
//                        if (err) res.json(err);
//                        responseData.push({ rac : racName, hospitals : docs });
//                    }
//            }
//        });
//    res.send(JSON.stringify(docs,null,2));
//});

// URL: 
//      localhost:3000/mobile/home/nearby?latitude=x&longitude=y
//
// On bootup, phone gets user latitude and longitude and hits this endpoint
// with those values encoded as a query string to find nearby hospitals.
//
// Returns:
//      - 404 on invalid request (i.e. no lat/long values provided)
//      - 201 if no hospitals were found within range
//      - 200 + json data of the form [{ hid, name, address}] for nearby hospitals

router.get("/home/nearby", (req, res) => {
    const range = 100;
    let latitude = parseInt(req.query.latitude);
    let longitude = parseInt(req.query.longitude);
    if (latitude && longitude) {
        Hospital
            .find({})
            .select("hid name address") 
            .where('latitude').lte(latitude + range).gte(latitude - range)
            .where('longitude').lte(longitude + range).gte(longitude - range)
            .exec((err, docs) => {
                if (err) {
                    res.status(404).send(err);
                } else if (docs === {}) {
                    res.status(201).send("No nearby hospitals found.");
                } else {
                    res.status(200).send(JSON.stringify(docs,null,2));
                }
            });
    } else {
        res.status(400).send("Bad Request: URL must include contain querystring '?latitude=x&longitude=y'\n");
    }
});

module.exports = router;
