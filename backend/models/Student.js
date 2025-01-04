const mongoose = require('mongoose');
const User = require('./User');

const studentSchema = new mongoose.Schema({
  parentName: { type: String, required: true },
  parentPhone: { type: String, required: true },
  year: { type: Number, required: true },
  dateOfBirth: { type: Date, required: true },
  additionalDetails: { type: mongoose.Schema.Types.Mixed },
});

const Student = User.discriminator('student', studentSchema);

module.exports = Student;
