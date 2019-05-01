const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Connect to the Google Maps Geocoding API
let google_key = process.env.GOOGLEMAPS_API_KEY;
if (google_key) {
} else {
    const keyFile = path.resolve(__dirname, 'api_key.txt');
    const contents = fs.readFileSync(keyFile).toString();
    google_key = contents;
}
const googleMapsClient = require('@google/maps').createClient({
        key: google_key
});

const Hospital = mongoose.model('Hospital');

// Creates a new Hospital in the database
router.post('/', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    // Geocode an address, get lat and lng
    googleMapsClient.geocode({
        address: req.body.address
    }, function(err, response) {
        if (!err) {
            var myjson = response.json.results;
            req.body.latitude = myjson[0].geometry.location.lat;
            req.body.longitude = myjson[0].geometry.location.lng;

            // Save new Hospital to database
            let newHospital = new Hospital(req.body);
            newHospital.save()
                .then(doc => {
                    if(!doc || doc.length === 0) {
                        return res.status(500).send(doc);
                    }

                    res.status(201).send(doc);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }
    });
});

// Updates an existing hospital
router.put('/:hid', (req, res) => {
    if(!req.params.hid) {
        return res.status(400).send('Missing URL parameter: hospital id (hid)');
    }

    // In case address is altered, geocoding is done again
        googleMapsClient.geocode({
            address: req.body.address
        }, function (err, response) {
            if (!err) {
                var myjson = response.json.results;
                req.body.latitude = myjson[0].geometry.location.lat;
                req.body.longitude = myjson[0].geometry.location.lng;

                Hospital.findOneAndUpdate({
                    hid: req.params.hid
                }, req.body, {new: true})
                    .then(doc => {
                        res.json(doc)
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            }
        });
});

// Deletes an existing hospital
router.delete('/:hid', (req, res) => {
    if(!req.params.hid) {
        return res.status(400).send('Missing URL parameter: hospital id (hid)');
    }
    Hospital.findOneAndRemove({
        hid: req.params.hid})
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch(err.errors[field].path) {
        case 'hospitalName':
            body['hospitalNameError'] = err.errors[field].message;
            break;
        case 'email':
            body['emailError'] = err.errors[field].message;
            break;
        default:
            break;
        }
    }
}

// http://statt-portal.herokuapp.com/hospital
// Generates the table of hospitals, unless querystring is included
router.get('/', (req, res) => {
    if(req.query.name) {
        queryHospitalByName(req, res);
    } else  if(req.query.rac) {
        queryHospitalByRAC(req, res);
    } else {
        Hospital.find((err, docs) => {
            if (!err) {
                res.render('hospital/index', {
                    list: docs
                });
            } else {
                console.log(`Error in retrieving hospital index : ${err}`);
            }
        });
    }
});

// query hospital by name, return in json format
function queryHospitalByName(req, res) {
    Hospital.find({
        name: new RegExp(req.query.name)
    })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

// query hospital by RAC, return in json format
function queryHospitalByRAC(req, res) {
    Hospital.find({
        rac: new RegExp(req.query.rac)
    })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

// http://statt-portal.herokuapp.com/hospital/:hid
// Generates the Hospital in json format matching the id
router.get('/:hid', (req, res) => {
    if (!req.params.hid) {
        return res.status(400).send('Missing URL parameter: hospital id (hid)')
    }
    Hospital.findOne({ hid: req.params.hid })
  .then(doc => {
            res.json(doc);
  })
  .catch(err => {
            res.status(404).json(err);
        });
});


module.exports = router;
