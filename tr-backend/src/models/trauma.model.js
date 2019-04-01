const mongoose = require('mongoose');

let traumaSchema = new mongoose.Schema({
    traumanId: {
        type: Number,
        required: 'This field is required'
    },
    traumaName: {
        type: String
    },
    criteria: {
        type: [String]
    },
    notes: {
        type: String
    }
});



//module.exports = mongoose.model('Employee', employeeSchema);
mongoose.model('Trauma', traumaSchema);