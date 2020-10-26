const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// User Schema
const UserSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true,
  },
  teams:{
    type: [{
      weekId: {
        type: Number,
        required: true,
      },
      footballers:{
        type: [String]
      }
    }]
  }
});

const User = module.exports = mongoose.model('User', UserSchema);
