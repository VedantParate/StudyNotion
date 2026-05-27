// backend/routes/course.js

const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  deleteCourse,
  editCourse,
  getInstructorCourses,
} = require("../controllers/Course");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

const {
  createCategory,
  showAllCategories,
  getCategoryPageDetails,
} = require("../controllers/Category");

const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

// ✅ FIX: import the now-complete courseProgress controller
const { updateCourseProgress } = require("../controllers/courseProgress");

const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

// ─── Course routes ────────────────────────────────────────────────────────────
router.post("/createCourse",         auth, isInstructor, createCourse);
router.get("/getAllCourses",          getAllCourses);
router.post("/getCourseDetails",     getCourseDetails);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.post("/editCourse",           auth, isInstructor, editCourse);
router.delete("/deleteCourse",       auth, isInstructor, deleteCourse);
router.get("/getInstructorCourses",  auth, isInstructor, getInstructorCourses);

// ✅ FIX: register the missing route — frontend POSTs here after each video ends
router.post("/updateCourseProgress", auth, updateCourseProgress);

// ─── Section routes ───────────────────────────────────────────────────────────
router.post("/addSection",      auth, isInstructor, createSection);
router.post("/updateSection",   auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);

// ─── SubSection routes ────────────────────────────────────────────────────────
router.post("/addSubSection",      auth, isInstructor, createSubSection);
router.post("/updateSubSection",   auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

// ─── Category routes ──────────────────────────────────────────────────────────
router.post("/createCategory", auth, isInstructor, createCategory);
router.get("/showAllCategories",      showAllCategories);
router.post("/getCategoryPageDetails", getCategoryPageDetails);

// ─── Rating & Review routes ───────────────────────────────────────────────────
router.post("/createRating",    auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews",       getAllRating);

module.exports = router;
