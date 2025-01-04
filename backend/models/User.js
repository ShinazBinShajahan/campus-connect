const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'staff', 'HOD', 'administrator'],
      required: true,
    },
    department: {
      type: String,
      required: function () {
        return this.role !== 'administrator';
      },
    },
    isEmailVerified: { type: Boolean, default: false },
    account_status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true, discriminatorKey: 'role' }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
