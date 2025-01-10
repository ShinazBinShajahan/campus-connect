const express = require('express');
const { registerUser, getUsers } = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management API
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a user with one of the following roles - student, staff, HOD, administrator.
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - title: Student Registration Example
 *                 type: object
 *                 required:
 *                   - name
 *                   - email
 *                   - phone
 *                   - role
 *                   - department
 *                   - parentName
 *                   - parentPhone
 *                   - year
 *                   - dateOfBirth
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Alice Smith
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: alice@student.com
 *                   phone:
 *                     type: string
 *                     example: "1234567890"
 *                   role:
 *                     type: string
 *                     enum: [student, staff, HOD, administrator]
 *                     example: student
 *                   department:
 *                     type: string
 *                     example: Computer Science
 *                   parentName:
 *                     type: string
 *                     example: John Smith
 *                   parentPhone:
 *                     type: string
 *                     example: "9876543210"
 *                   year:
 *                     type: number
 *                     example: 2
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     example: "2005-07-15"
 * 
 *               - title: Staff Registration Example
 *                 type: object
 *                 required:
 *                   - name
 *                   - email
 *                   - phone
 *                   - role
 *                   - department
 *                   - designation
 *                   - dateOfJoining
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Bob Johnson
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: bob@staff.com
 *                   phone:
 *                     type: string
 *                     example: "2345678901"
 *                   role:
 *                     type: string
 *                     example: staff
 *                   department:
 *                     type: string
 *                     example: Mathematics
 *                   designation:
 *                     type: string
 *                     example: Lecturer
 *                   dateOfJoining:
 *                     type: string
 *                     format: date
 *                     example: "2022-03-01"
 * 
 *               - title: HOD Registration Example
 *                 type: object
 *                 required:
 *                   - name
 *                   - email
 *                   - phone
 *                   - role
 *                   - department
 *                   - dateOfPromotion
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Clara Lee
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: clara@hod.com
 *                   phone:
 *                     type: string
 *                     example: "3456789012"
 *                   role:
 *                     type: string
 *                     example: HOD
 *                   department:
 *                     type: string
 *                     example: Physics
 *                   dateOfPromotion:
 *                     type: string
 *                     format: date
 *                     example: "2023-01-10"
 * 
 *               - title: Administrator Registration Example
 *                 type: object
 *                 required:
 *                   - name
 *                   - email
 *                   - phone
 *                   - role
 *                   - systemAccessLevel
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Daniel King
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: daniel@admin.com
 *                   phone:
 *                     type: string
 *                     example: "4567890123"
 *                   role:
 *                     type: string
 *                     example: administrator
 *                   systemAccessLevel:
 *                     type: string
 *                     example: superadmin
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
 *       400:
 *         description: Bad request, validation failed
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: "Retrieve a list of all users in the database."
 *     tags: 
 *       - Users
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
