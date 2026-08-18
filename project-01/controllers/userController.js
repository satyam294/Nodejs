const User = require("../models/user");

async function getAllUsers (req, res) {
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
}

async function getUserById(req, res){
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ status: "user not found" });
  return res.status(200).json(user);
}

async function updateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.json({ status: 'success' });
}

async function deleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: 'success' });
}

async function addUser(req, res) {
  const userData = req.body;

  if (!userData ||
    !userData.first_name ||
    !userData.last_name ||
    !userData.email ||
    !userData.gender ||
    !userData.job_title) {
    return res.status(400).json({ status: "incomplete user details" });
  }

  // create a new entry
  const newUser = await User.create({
    firstName: userData.first_name,
    lastName: userData.last_name,
    email: userData.email,
    gender: userData.gender,
    jobTitle: userData.job_title,
  });

  return res.status(201).json({
    msg: 'success',
    userId: newUser._id,
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  addUser,
};