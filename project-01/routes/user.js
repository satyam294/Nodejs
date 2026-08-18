const express = require("express");
const User  = require("../models/user");
const { 
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  addUser 
} = require("../controllers/userController");

const router = express.Router();

// GET - all users
router.route('/')
  .get(getAllUsers)
  .post(addUser);

// dynamic path parameters : the third path in url is a variable -> sp start with ':' and name it anything
router.route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);


module.exports = router;