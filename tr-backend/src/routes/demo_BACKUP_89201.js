const bodyparser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
<<<<<<< Updated upstream
const router = express.Router();

// Declare static data 

const Hospital = mongoose.model('Hospital');
const HospitalData = [
    {
	hid: 0,
	name: "UNC Health Care",
	rac: "Mid-Carolina",
	traumaLevel: "Adult, Pediatric",
	services: [],
	address: "101 Manning Drive, N.C. Neurosciences Hospital, Basement, Chapel Hill, NC 27514",
	latitude: 0,  // Computed once by API at time of entry via Maps Geocoding service
	longitude: 0,
	phoneDirectory: [
		{
			connection: "Patient Logistics Center-1",
			number: "1-855-PLC-4-UNC"},
		{
			connection: "Emergency Department-Charge Nurse",
			number: "984-974-5602"},
		{
			connection: "BAT PhONE",
			number: "984-974-2024"}
	 ],
	email: "tarheeltrauma@unchealth.unc.edu",
	notes: "GOAL: Door to Decision Time 15 Minutes..."
    }
];

const ActivationData = [
    {
	aid: 0,
	name: "Adult Red",
	criteria: [
	    "<b>Traumatic cardiac arrest</b> during transport to UNC",
	    "<b>Airway Compromise / Intubation / Respiratory Distress</b> to include burns with known / suspected inhalation injuries",
	    "<b>Shock</b> at any time prior to or after patient arrival",
	    ">> Age 16-64: Systolic BP <90", // Note: subitems
	    ">> Age 65 or older: Systolic BP <110", 
	    "<b>Unresponsive:</b> GCS < 8 with traumatic MOI",
	    "Transfer patient <b>receiving blood</b> en route to maintain VS",
	    "<b>Penetrating wounds</b> to head, neck, chest, abdomen",
	    "<b>Neuro deficits in limb</b> with traumatic MOI",
	    "<b>Tourniquet use and/or vascular</b> compromise of extremity",
	    "<b>Amputation</b> above wrist or ankle",
	    "<b>Burn patients with known or suspected trauma</b> meeting red alert criteria",
	    "<b>Multiple casualties:</b> >3 red or yellow alerts",
	    "ED Physician or Trauma Surgeon discretion",
	],
	notes: "Age 0 - 15" 
    },
    {
	aid: 1,
	name: "Adult Yellow",
	criteria: [
	    "Respiratory rate <10 or >30",
	    "Pulse rate <60 or >110",
	    "Flail chest or multiple rib fractures",
	    "Pneumothorax  / hemothorax",
	    "GCS<14 but >8  with MOI attributed to trauma",
	    "Known head bleed on anticoagulants / antiplatelets other than Aspirin",
	    "Open or depressed skull fractures",
	    "Two or more long bone (humerus / femur) fractures or deformities",
	    "Crush injury to chest or pelvis",
	    "Open fracture of femur, humerus, radius, ulna, tibia, or fibula in setting of any additional known or suspected traumatic injuries",
	    "Burns with known or suspected trauma meeting yellow criteria",
	    "Known hip and/or knee dislocation",
	    "All trauma transfers from outside hospitals age 65 or older (unless upgraded to Red Tag or deferred by EM discretion)",
	    "ED Physician or Trauma Surgeon discretion",
	],
	notes: "Age 0 - 15"
=======

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
>>>>>>> Stashed changes
    }
});

// Example data definition / entry //////////

const SampleSchema = new mongoose.Schema({
    first: String,
    last: String,
    email: String,
});

const Sample = mongoose.model('Sample', SampleSchema);

const sampleDocument = new Sample({ first: "Bob", last: "Smith", email: "bob_smith@gmail.com"});
const sampleDocuments = [
    {first: "Hank", last: "Jones", email: "hank_jones@gmail.com"},
    {first: "Judy", last: "Bloom", email: "judy_bloom@gmail.com"},
    {first: "Nelly", last: "Sanders", email: "nelly_sanders@gmail.com"},
    {first: "Aaron", last: "Rodriguez", email: "arod@gmail.com"},
    {first: "Billy Ray", last: "Cyrus", email: "achy_breaky@gmail.com"},
];

Sample.collection.drop(); // reset data during development

sampleDocument.save((err) => {
    if (err) {
	console.error(err); 
    } else {
	console.log("sampleDocument saved to database");
    }
});

Sample.insertMany(sampleDocuments, (err) => {
    if (err) {
	console.error(err); 
    } else {
	console.log("collection of documents saved to database");
    }
});

/////////////////////////////////////////////

function populateDatabase() {
    // If data exists, exit
}

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

app.get("/home

app.listen(PORT, (err) => {
    if (err) {
	console.error(`${FgRed}ERROR:${Reset} ${err}`);
    } else {
	console.log(`${FgGreen}SUCCESS:${Reset} Application running on Port ${PORT}`);
    }
});

/////////////////////////////////////////////
// Sample route with db querying

// app.get("/sample", (req, res) => {
//     Sample.find({}, (err, docs) => {
// 	if (err) {
// 	    console.error(err);
// 	    res.send("Error retrieving samples");
// 	} else {
// 	    res.send(JSON.stringify(docs));
// 	}
//     });
// });

