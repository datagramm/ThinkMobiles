const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  login: {
      type: String,
      required: true,
  },
  mail: {
      type: String,
      required: true,

  },
    password: {
      type: String,
        required: true,
    }


})

const Client = mongoose.model('Client', clientSchema);
module.exports = Client