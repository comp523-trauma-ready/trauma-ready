const mongoose = require('mongoose');

let traumaSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: "Must provide a unique id for each trauma"
  },
  name: {
    type: String
  },
  criteria: {
    type: [Object]
  },
  notes: {
    type: String
  }
});

mongoose.model('Trauma', traumaSchema);
