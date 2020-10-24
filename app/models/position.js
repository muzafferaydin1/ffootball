const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Position Schema
const PositionSchema = mongoose.Schema({
    position:{
    type: [String]
  }
});

const Position = module.exports = mongoose.model('Position', PositionSchema);