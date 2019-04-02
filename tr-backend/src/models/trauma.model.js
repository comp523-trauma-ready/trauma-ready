const mongoose = require('mongoose');

let traumaSchema = new mongoose.Schema({
    traumanId: {
        type: Number,
        required: 'This field is required'
    },
    traumaType: {
        type: String
    },
    criteria: {
        type: [Object]
    },
    notes: {
        type: String
    }
});



//module.exports = mongoose.model('Employee', employeeSchema);
mongoose.model('Trauma', traumaSchema);