let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Article Schema
let footballerSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  teamId: {
    type: Number,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  playedPositions: {
    type: String,
    required: true,
  },
  positionText: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  minsPlayed: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});


let Footballer = (module.exports = mongoose.model(
  "calculated_footballer",
  footballerSchema
));
