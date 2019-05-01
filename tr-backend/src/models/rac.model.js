const mongoose = require('mongoose');

let racSchema = new mongoose.Schema({
  rid: {
    type: Number,
    required: "Must provide a unique id for each RAC",
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  activationCodes: [
    {
      aid: {
        type: Number,
        required: 'Must match the Activation ID with which it corresponds'
      },
      code: {
        type: String,
        required: true
      }
    }],
  notes: {
    type: String
  }
}, autoIncrement = require('mongoose-auto-increment'));

racSchema.plugin(autoIncrement.plugin, {model:'RAC', field: 'rid'});


mongoose.model('RAC', racSchema);
