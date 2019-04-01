const mongoose = require('mongoose');

let hospitalSchema = new mongoose.Schema({
  hospitalId: {
    type: Number,
    required: 'This field is required'
  },
  hospitalName: {
    type: String,
    required: 'This field is required'
  },
  rac: {
    type: String
  },
  traumaLevel: {
    type: String
  },
  services: {
    type: [String]
  },
  ddress: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  phoneDirectory: {
    type: [String]
  },
  email: {
    type: String
  },
  notes: {
    type: String
  }
});

// Custom validation for email
hospitalSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

//module.exports = mongoose.model('Employee', employeeSchema);
mongoose.model('Hospital', hospitalSchema);