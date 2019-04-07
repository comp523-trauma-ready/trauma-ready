const mongoose = require('mongoose');

let activationsSchema = new mongoose.Schema({
    aid: {
        type: Number,
        required: 'This field is required'
    },
    name: {
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

mongoose.model('Activations', activationsSchema);
