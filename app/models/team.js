let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Article Schema
let teamSchema = mongoose.Schema({
  _id: {
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
  }
});

let Team = (module.exports = mongoose.model(
  "Team",
  teamSchema
));
