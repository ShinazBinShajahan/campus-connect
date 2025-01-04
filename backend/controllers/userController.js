const User = require('../models/User');
const Student = require('../models/Student');
const Staff = require('../models/Staff');
const HOD = require('../models/HOD');
const Administrator = require('../models/Administrator');

// Create User
exports.createUser = async (req, res) => {
  const { role, ...userData } = req.body;

  try {
    let user;

    switch (role) {
      case 'student':
        user = await Student.create(userData);
        break;
      case 'staff':
        user = await Staff.create(userData);
        break;
      case 'HOD':
        user = await HOD.create(userData);
        break;
      case 'administrator':
        user = await Administrator.create(userData);
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    res.status(201).json({ message: `${role} created successfully`, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
