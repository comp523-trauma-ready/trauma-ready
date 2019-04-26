const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const fs = require('fs');

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

router.get('/edit', (req, res) => {
    res.render('hospital/addOrEdit', {
        viewTitle : "Add Hospital"
    });
});

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

// router.post('/', (req, res) => {
//     if (req.body._id == '') {
//         insertRecord(req, res);
//     } else {
//         updateRecord(req, res);
//     }
// });

//
// function insertRecord(req, res) {
//     let hospital = new Hospital();
//     hospital.hospitalName = req.body.hospitalName;
//     hospital.email = req.body.email;
//     hospital.phoneDirectory = req.body.phone;
//     hospital.rac = req.body.traumaRegion;
//     hospital.address = req.body.address;
//     hospital.traumaLevel = req.body.traumaLevel;
//     hospital.save((err, doc) => {
//         if (!err) {
//             res.redirect('hospital/list');
//         } else {
//             if (err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);
//                 res.render('hospital/addOrEdit', {
//                     viewTitle : "Add Hospital",
//                     hospital : req.body
//                 });
//             } else {
//                 console.log(`Error during record insertion : ${err}`);
//             }
//         }
//     });
// }


// function updateRecord(req, res) {
//     Hospital.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
//         if (!err) {
//             res.redirect('hospital/list');
//         } else {
//             if (err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);
//                 res.render("hospital/addOrEdit", {
//                     viewTitle: 'Update Hospital',
//                     hospital: req.body
//                 });
//             } else {
//                 console.log(`Error during record update : ${err}`);
//             }
//         }
//     }
//     });

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

router.get('/list', (req, res) => {
    Hospital.find((err, docs) => {
        if (!err) {
            res.render('hospital/list', {
                list: docs
            });
        } else {
            console.log(`Error in retrieving hospital list : ${err}`);
        }
    });
});

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
//
// router.get('/', (req, res) => {
//     if(!req.query.name) {
//         return res.status(400).send('Missing URL parameter: hospital name');
//     }
//     res.send(`You have requested a hospital ${req.query.name}`);
// });

// router.get('/:id', (req, res) => {
//     Hospital.findById(req.params.id, (err, doc) => {
//  if (!err) {
//      res.render('hospital/addOrEdit', {
//    viewTitle: 'Update Hospital',
//    hospital: doc
//      });
//  }
//     });
// });

// router.get('/delete/:hid', (req, res) => {
//     Hospital.findByIdAndRemove(req.params.hid, (err, doc) => {
//         if (!err) {
//             res.redirect('/hospital/list');
//         } else {
//             console.log(`Error in hospital delete ${err}`);
//         }
//     });
// });

module.exports = router;
