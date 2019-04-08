const bodyparser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const FgGreen = "\x1b[32m";
const FgRed = "\x1b[31m";
const Reset = "\x1b[0m";

// localserver
const DATABASE_URL = "mongodb://127.0.0.1:27017/traumaready"; 
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

mongoose.connect(DATABASE_URL, { useNewUrlParser: false }/* Make true for Heroku deployment*/, (err) => {
    if (err) {
        console.error(`${FgRed}ERROR:${Reset} ${err}`);
        console.error(typeof DATABASE_URL);
    } else {
        console.log(`${FgGreen}SUCCESS:${Reset} Connected to MongoDB at ${DATABASE_URL}`);
    }
});

/////////////////////////////////////////////

const RACSchema = new mongoose.Schema({
    rid: { type: Number, required: "Must provide a unique id for each RAC" },
    name: String,
    activationCodes: [Number],
    notes: String,
});

const RAC = mongoose.model("RAC", RACSchema);

/////////////////////////////////////////////

const ActivationSchema = new mongoose.Schema({
    aid: { type: Number, required: "Must provide a unique id for each Activation" },
    name: String,
    updated: { type: Date, default: Date.now },
    rac: Number,
    criteria: [String],
    notes: [String],
});

const Activation = mongoose.model("Activation", ActivationSchema);

/////////////////////////////////////////////

const HospitalSchema = new mongoose.Schema({
    hid: { type: Number, required: "Must provide a unique id for each Hospital" },
    name: { type: String, required: "Must provide a valid name for each Hospital" },
    rac: Number,
    address: String,
    latitude: Number,
    longitude: Number,
    phoneDirectory: [{ connection: String, number: String }],
    email: String,
    services: [String],
    notes: [String],
});

const Hospital = mongoose.model("Hospital", HospitalSchema);

/////////////////////////////////////////////

function populateDatabase() {
    RAC.collection.drop();
    Activation.collection.drop();
    Hospital.collection.drop();

    const RACData = [
        { rid: 0, name: "Mid-Carolina", activationCodes: [0,1,2,3], notes: " "},
    ];

    const ActivationData = [
        { aid: 0, name: "Adult Red", rac: 0, criteria: ["leg broke", "no hands"], notes: [""]},
        { aid: 1, name: "Adult Yellow", rac: 0, criteria: ["arm broke", "no legs"], notes: [""]},
    ];

    const HospitalData = [
        { hid: 0, name: "UNC Health Care", rac: 0, latitude: 0, longitude: 0,
          address: "101 Manning Drive, N.C. Neurosciences Hospital, Basement, Chapel Hill, NC 27514",
          phoneDirectory: [
              { connection: "Patient Logistics Center-1", number: "1-855-PLC-4-UNC" },
              { connection: "Emergency Department-Charge Nurse", number: "984-974-5602" },
              { connection: "BAT PhONE", number: "984-974-2024" }
          ],
          email: "tarheeltrauma@unchealth.unc.edu",
          services: [""],
          notes: ["GOAL: Door to Decision Time 15 Minutes..."]
        },
    ];

    RAC.insertMany(RACData, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("RACs inserted in database");
        }
    });

    Activation.insertMany(ActivationData, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Activations inserted in database");
        }
    });

    Hospital.insertMany(HospitalData, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Hospitals inserted in database");
        }
    });
}

populateDatabase();

/////////////////////////////////////////////

// home screen:
//   - find location 
//   - find weather forecast
//   - find nearby / RAC hospitals
//   - find recent activations 
// search screen:
//   - find trauma centers by name
//   - find activations by symptom
// directory screen:
//   - find all RACs
//   - find all trauma centers
//   - find all activations
// profile screen:
//   - find data from a single hospital
//   - find activations from a single hospital
// activation screen:
//   - find data from a single activation

/////////////////////////////////////////////

app.get("/", (req, res) => {
    res.send('requests are working\n');
});

app.get("/directory", (req, res) => {
    
    
});

/////////////////////////////////////////////
// Sample route with db querying
// app.get("/sample", (req, res) => {
//     Sample.find({}, (err, docs) => {
//      if (err) {
//          console.error(err);
//          res.send("Error retrieving samples");
//      } else {
//          res.send(JSON.stringify(docs));
//      }
//     });
// });

app.listen(PORT, (err) => {
    if (err) {
        console.error(`${FgRed}ERROR:${Reset} ${err}`);
    } else {
        console.log(`${FgGreen}SUCCESS:${Reset} Application running on Port ${PORT}`);
    }
});
