const mongoose = require('mongoose');

const traumaSchema = new mongoose.Schema({
    tid: {
        type: Number,
        required: "Must provide a unique id for each trauma",
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    criteria: [{
        rac: {
        type: String,
        required: true
    },
    activationCodes: {
        type: [String],
        required: true}
    }],
    notes: {
        type: String
    }
}, autoIncrement = require('mongoose-auto-increment'));

traumaSchema.plugin(autoIncrement.plugin, {model:'Trauma', field: 'tid'});

mongoose.model('Trauma', traumaSchema);