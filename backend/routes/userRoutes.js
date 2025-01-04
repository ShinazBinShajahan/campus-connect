const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser); // Create a user with role
router.get('/', getUsers); // Get all users

module.exports = router;
