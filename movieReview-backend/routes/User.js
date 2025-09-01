const express = require("express");
const router = express.Router();

const {
  login,
  signup
  
} = require("../controller/Auth");

const {
  getUserProfile,
  updateUserProfile
}=require("../controller/UserController")

//Authentication routes
const { auth } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

// routes/userRoutes.js
router.get("/getUserProfile/:id", auth, getUserProfile);

router.put("/updateUserProfile/:id", auth, updateUserProfile);


module.exports = router;
