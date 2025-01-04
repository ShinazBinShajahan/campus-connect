const mongoose = require('mongoose');
const User = require('./User');

const staffSchema = new mongoose.Schema({
  designation: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },
  additionalDetails: { type: mongoose.Schema.Types.Mixed },
});

const Staff = User.discriminator('staff', staffSchema);

module.exports = Staff;
