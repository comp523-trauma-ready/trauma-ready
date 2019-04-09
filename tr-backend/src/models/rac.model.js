const mongoose = require('mongoose');

let racSchema = new mongoose.Schema({
  rid: {
    type: Number,
    required: "Must provide a unique id for each RAC"
  },
  name: {
    type: String
  },
  // activationCodes: {
  //   type: [String]
  // },
  activationCodes: [
    {
      aid: Number,
      code: String
    }],
  notes: {
    type: String
  }
});

mongoose.model('RAC', racSchema);
