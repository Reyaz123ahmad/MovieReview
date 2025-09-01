
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/UserSchema");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      accountType,
      profilePicture
      
    } = req.body;

    // Validate required fields
    if (!username || !email || !password || !accountType) {
      return res.status(403).json({ success: false, message: "All fields are required" });
    }


    if (!["Admin", "User"].includes(accountType)) {
      return res.status(400).json({ success: false, message: "Invalid account type" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists. Please sign in." });
    }
    // Prevent multiple Admin registrations
    if (accountType.toLowerCase() === "admin") {
      const existingAdmin = await User.findOne({ accountType:{$regex: /^admin$/i} });
      if (existingAdmin) {
        return res.status(403).json({
          success: false,
          message: "Admin account already exists. Only one admin allowed.",
        });
      }
    }

  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    

    // Create User
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      confirmPassword,
      accountType,
      
      profilePicture: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
    });

    
    const token = jwt.sign(
      { email: user.email, id: user._id, accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
   );

   user.token = token;
   user.password = undefined;

    return res.status(200).json({ 
      success: true, 
      token,
      user, 
      message: "User registered successfully" 
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({ 
      success: false,
      message: "User registration failed" 
    });
  }
};












// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please fill in all required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not registered. Please sign up." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("Token Payload:", jwt.decode(token));

    user.token = token;
    user.password = undefined;

    console.log("NODE_ENV:", process.env.NODE_ENV);

    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      //secure: process.env.NODE_ENV === "production",
      secure:true,
      sameSite: "None",
    };
    // Detect if request is from browser
    const isBrowser = req.headers['user-agent']?.includes("Mozilla");
    if (isBrowser) {
      res.cookie("token", token, options);
    }
    res.status(200).json({
      success: true,
      token,
      user,
      message: "Login successful",
    });
    
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Login failed. Please try again." });
  }
};


