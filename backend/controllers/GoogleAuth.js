// backend/controllers/GoogleAuth.js

const User    = require("../models/User")
const Profile = require("../models/Profile")
const jwt     = require("jsonwebtoken")
require("dotenv").config()

exports.googleLogin = async (req, res) => {
  try {
    const { email, firstName, lastName, image, googleId } = req.body

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" })
    }

    // Check if user already exists
    let user = await User.findOne({ email }).populate("additionalDetails")

    if (!user) {
      // Create a new profile
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      })

      // Create new user
      user = await User.create({
        firstName,
        lastName,
        email,
        image:             image || `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        accountType:       "Student",
        googleId,
        additionalDetails: profileDetails._id,
        approved:          true,
        password:          googleId + process.env.JWT_SECRET, // dummy password
        courses:           [],
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id, accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )

    user = user.toObject()
    user.token = token
    user.password = undefined

    return res.status(200).json({
      success: true,
      token,
      user,
      message: "Google login successful",
    })
  } catch (error) {
    console.error("Google login error:", error)
    return res.status(500).json({
      success: false,
      message: "Google login failed",
    })
  }
}