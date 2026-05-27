// backend/routes/profile.js

const express = require("express");
const router = express.Router();

const {
  updateProfile,
  deleteAccount,
  getUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,        // ← make sure this is imported
} = require("../controllers/Profile");

const { auth, isInstructor } = require("../middlewares/auth");

// existing routes...
router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteProfile", auth, deleteAccount);
router.get("/getUserDetails", auth, getUserDetails);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

// ← this one is probably missing:
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;