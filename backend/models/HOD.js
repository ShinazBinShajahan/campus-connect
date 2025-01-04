const mongoose = require('mongoose');
const User = require('./User');

const hodSchema = new mongoose.Schema({
  dateOfPromotion: { type: Date, required: true },
  additionalDetails: { type: mongoose.Schema.Types.Mixed },
});

const HOD = User.discriminator('HOD', hodSchema);

module.exports = HOD;
