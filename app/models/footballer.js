let mongoose = require("mongoose");

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

// {
//     "_id": {
//         "$oid": "5f7b75e27ed36d1beb12ddb8"
//     },
//     "id": 40989,
//     "name": "Souza",
//     "firstName": "Josef",
//     "lastName": "De Souza Dias",
//     "teamId": 133,
//     "teamName": "Besiktas",
//     "playedPositions": "-DMC-",
//     "height": 188,
//     "weight": 82,
//     "age": 31,
//     "minsPlayed": 90,
//     "rating": 8.41
// }

let Footballer = (module.exports = mongoose.model(
  "calculated_footballer",
  footballerSchema
));
