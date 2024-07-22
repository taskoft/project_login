const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const userSchema = new Schema({
  username: { type: String, required: true, unique: false },
  password: { type: String, required: true, unique: false },
  isSuperAdmin: { type: Boolean, required: true, unique: false },
  email: { type: String, required: true, unique: false },
  balance: { type: String, required: true, unique: false, default: getRandomInt(1000).toString() }
})
const User = mongoose.model('User', userSchema);
module.exports = User;