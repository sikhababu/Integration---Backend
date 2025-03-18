const mongoose = require('mongoose');

// Defining a schema for a user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,

    unique: true
   
  },
  password: {
    type: String,
    required: true,  
   
  }
  
}, {timestamps:true});

// Creating a model from the schema
const UserModel = mongoose.model('User', userSchema);

module.exports= UserModel