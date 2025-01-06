const User = require('../models/User');
const Student = require('../models/Student');
const Staff = require('../models/Staff');
const HOD = require('../models/HOD');
const Administrator = require('../models/Administrator');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, role, department, additionalDetails, ...roleSpecificData } = req.body;

    if (!name || !email || !phone || !role) {
      return res.status(400).json({ error: 'Name, email, phone, and role are required.' });
    }

    const validRoles = ['student', 'staff', 'HOD', 'administrator'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: `Invalid role. Allowed roles: ${validRoles.join(', ')}` });
    }

    const baseUserData = {
      name,
      email,
      phone,
      role,
      department: role !== 'administrator' ? department : undefined,
      account_status: 'inactive',
      isEmailVerified: false,
    };

    let user;

    switch (role) {
      case 'student':
        if (!roleSpecificData.parentName || !roleSpecificData.parentPhone || !roleSpecificData.year || !roleSpecificData.dateOfBirth) {
          return res.status(400).json({ error: 'Student requires parentName, parentPhone, year, and dateOfBirth.' });
        }
        user = await Student.create({ ...baseUserData, ...roleSpecificData });
        break;

      case 'staff':
        if (!roleSpecificData.designation || !roleSpecificData.dateOfJoining) {
          return res.status(400).json({ error: 'Staff requires designation and dateOfJoining.' });
        }
        user = await Staff.create({ ...baseUserData, ...roleSpecificData });
        break;

      case 'HOD':
        if (!roleSpecificData.dateOfPromotion) {
          return res.status(400).json({ error: 'HOD requires dateOfPromotion.' });
        }
        user = await HOD.create({ ...baseUserData, ...roleSpecificData });
        break;

      case 'administrator':
        user = await Administrator.create({ ...baseUserData, ...roleSpecificData });
        break;

      default:
        return res.status(400).json({ error: 'Invalid role specified.' });
    }

    res.status(201).json({ message: 'User registered successfully!', user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
