const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Principal', 'Teacher', 'Student'], required: true },
});

// No pre-save hook for hashing

// Simple password comparison method
userSchema.methods.matchPassword = function (enteredPassword) {
  return enteredPassword === this.password;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
