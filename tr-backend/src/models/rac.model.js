const mongoose = require('mongoose');

let racSchema = new mongoose.Schema({
    racId: {
        type: Number,
        required: 'This field is required'
    },
    racName: {
        type: String
    },
    activationCodes: {
        type: [String]
    },
    notes: {
        type: String
    }
});



// module.exports = mongoose.model('Employee', employeeSchema);
mongoose.model('RAC', racSchema);