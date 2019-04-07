const mongoose = require('mongoose');

let racSchema = new mongoose.Schema({
    id: {
	type: Number,
	required: "Must provide a unique id for each RAC"
    },
    name: {
	type: String
    },
    activationCodes: {
	type: [String]
    },
    notes: {
	type: String
    }
});

mongoose.model('RAC', racSchema);
