const mongoose = require('mongoose');

let activationsSchema = new mongoose.Schema({
    activationId: {
        type: Number,
        required: 'This field is required'
    },
    activationName: {
        type: String
    },
    age: {
        type: String
    },
    racs: {
        type: [String]
    },
    trauma: {
        type: [String]
    },
    notes: {
        type: String
    }
});



//module.exports = mongoose.model('Employee', employeeSchema);
mongoose.model('Activations', activationsSchema);