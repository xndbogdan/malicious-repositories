const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { defaultPassword } = require('../config');
const PasswordSchema = new Schema({
  value: {
    type: String,
    default: defaultPassword,
    required: true
  }
});

module.exports = mongoose.model('password', PasswordSchema);
