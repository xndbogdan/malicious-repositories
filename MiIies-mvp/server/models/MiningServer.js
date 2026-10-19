const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MiningServerSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  wallet: {
    type: String
  },
  xcbAddress:{
    type: String
  },
  coinId: {
    type: String
  },
  serverType:{
    type: String
  },
});

module.exports = mongoose.model('miningserver', MiningServerSchema);
