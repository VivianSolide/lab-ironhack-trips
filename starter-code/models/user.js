const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  provider_id: String,
  provider_name: String
});

const User = mongoose.model('User', UserSchema);
module.exports = User;