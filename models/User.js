const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: false },
  password: { type: String, required: true, unique: false },
  userType: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: false },

})
const User = mongoose.model('User', userSchema);
module.exports = User;