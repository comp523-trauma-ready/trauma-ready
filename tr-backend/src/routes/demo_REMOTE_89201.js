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

