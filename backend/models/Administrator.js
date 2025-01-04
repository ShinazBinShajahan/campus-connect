const mongoose = require('mongoose');
const User = require('./User');

const adminSchema = new mongoose.Schema({
  systemAccessLevel: { type: String, default: 'superadmin' },
});

const Administrator = User.discriminator('administrator', adminSchema);

module.exports = Administrator;
