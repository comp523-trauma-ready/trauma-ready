const mongoose = require('mongoose');

let traumaSchema = new mongoose.Schema({
  tid: {
    type: Number,
    required: "Must provide a unique id for each trauma"
  },
  name: {
    type: String
  },
  criteria: [
    {
      rac: String,
      activationCodes: [String]
    }
  ],
  notes: {
    type: String
  }
});

mongoose.model('Trauma', traumaSchema);
