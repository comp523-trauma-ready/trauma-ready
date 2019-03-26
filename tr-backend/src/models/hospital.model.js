const mongoose = require('mongoose');

let hospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: 'This field is required'
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  traumaRegion: {
    type: String
  },
  address: {
    type: String
  },
  traumaLevel: {
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
