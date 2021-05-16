const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
  });

UserSchema.pre('save', async function (next) {
  
  if(!this.isModified('password')) return next();

  this.password = await hash(this.password, 8);

  return this;
});


UserSchema.methods = {
  async compareHash(payload) {
    return compare(payload, this.password);
  }
}

UserSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, authConfig.secret , {
      expiresIn: 84700,
    });
  },
};


module.exports = mongoose.model('User', UserSchema);