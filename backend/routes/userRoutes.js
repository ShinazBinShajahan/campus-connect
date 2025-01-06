const express = require('express');
const { registerUser, getUsers } = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a user with one of the following roles: student, staff, HOD, administrator.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alice Smith
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alice@example.com
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *               role:
 *                 type: string
 *                 enum: [student, staff, HOD, administrator]
 *                 example: student
 *               department:
 *                 type: string
 *                 description: Required for roles other than administrator.
 *                 example: Computer Science
 *               parentName:
 *                 type: string
 *                 description: Required for student role.
 *                 example: John Smith
 *               parentPhone:
 *                 type: string
 *                 description: Required for student role.
 *                 example: "9876543210"
 *               year:
 *                 type: number
 *                 description: Required for student role.
 *                 example: 2
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Required for student role.
 *                 example: "2005-07-15"
 *               designation:
 *                 type: string
 *                 description: Required for staff role.
 *                 example: Lecturer
 *               dateOfJoining:
 *                 type: string
 *                 format: date
 *                 description: Required for staff role.
 *                 example: "2022-03-01"
 *               dateOfPromotion:
 *                 type: string
 *                 format: date
 *                 description: Required for HOD role.
 *                 example: "2023-01-10"
 *               systemAccessLevel:
 *                 type: string
 *                 description: Required for administrator role.
 *                 example: superadmin
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully!
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     name:
 *                       type: string
 *                       example: Alice Smith
 *                     email:
 *                       type: string
 *                       example: alice@example.com
 *                     role:
 *                       type: string
 *                       example: student
 *       400:
 *         description: Bad request, validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Student requires parentName, parentPhone, year, and dateOfBirth.
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users in the database.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c85"
 *                   name:
 *                     type: string
 *                     example: Alice Smith
 *                   email:
 *                     type: string
 *                     example: alice@example.com
 *                   phone:
 *                     type: string
 *                     example: "1234567890"
 *                   role:
 *                     type: string
 *                     example: student
 *                   account_status:
 *                     type: string
 *                     enum: [active, inactive]
 *                     example: inactive
 *                   isEmailVerified:
 *                     type: boolean
 *                     example: false
 *       500:
 *         description: Internal server error
 */
router.get('/', getUsers);

module.exports = router;
