let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name Required'
    },
    email: {
        type: String,
        required: 'Email Required'
    },
    password: {
        type: String,
        required: 'Password Required'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('User', userSchema);