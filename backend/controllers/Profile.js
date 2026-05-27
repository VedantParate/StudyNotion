// backend/controllers/Profile.js

const User = require("../models/User");
const Profile = require("../models/Profile");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// ─── Update Profile ───────────────────────────────────────────────────────────
exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      about,
      contactNumber,
      gender,
    } = req.body;

    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    const profileId = userDetails.additionalDetails;

    await Profile.findByIdAndUpdate(profileId, {
      dateOfBirth,
      about,
      contactNumber,
      gender,
    });

    await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
    });

    const updatedUser = await User.findById(userId)
      .populate("additionalDetails");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// ─── Delete Account ───────────────────────────────────────────────────────────
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    for (const courseId of user.courses) {
      await Course.findByIdAndUpdate(courseId, {
        $pull: { studentsEnrolled: userId },
      });
    }

    await Profile.findByIdAndDelete(user.additionalDetails);
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: error.message,
    });
  }
};

// ─── Get User Details ─────────────────────────────────────────────────────────
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetails = await User.findById(userId)
      .populate("additionalDetails");

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
      error: error.message,
    });
  }
};

// ─── Update Display Picture ───────────────────────────────────────────────────
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files?.displayPicture;
    const userId = req.user.id;

    if (!displayPicture) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      100
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    ).populate("additionalDetails");

    res.status(200).json({
      success: true,
      message: "Display picture updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update display picture",
      error: error.message,
    });
  }
};

// ─── Get Enrolled Courses ─────────────────────────────────────────────────────
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetails = await User.findById(userId)
      .populate({
        path: "courses",
        populate: [
          {
            // populate sections AND their subsections
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
          {
            // populate instructor name
            path: "instructor",
            select: "firstName lastName email image",
          },
        ],
      })
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // courses may be empty array — that's fine
    const enrolledCourses = userDetails.courses || [];

    const coursesWithProgress = await Promise.all(
      enrolledCourses.map(async (course) => {
        try {
          // Safely count total subsections — guard against null at every level
          let totalSubSections = 0;

          if (Array.isArray(course.courseContent)) {
            for (const section of course.courseContent) {
              if (section && Array.isArray(section.subSection)) {
                totalSubSections += section.subSection.length;
              }
            }
          }

          // Find progress doc — field names must match your CourseProgress model
          const courseProgress = await CourseProgress.findOne({
            courseID: course._id,   // ← matches your model field name
            userId: userId,          // ← matches your model field name
          });

          const completedVideos =
            Array.isArray(courseProgress?.completedVideos)
              ? courseProgress.completedVideos.length
              : 0;

          const progressPercentage =
            totalSubSections === 0
              ? 0
              : Math.round((completedVideos / totalSubSections) * 100);

          return {
            ...course.toObject(),
            totalSubSections,
            completedVideos,
            progressPercentage,
          };
        } catch (innerErr) {
          // If one course fails, don't crash the whole request
          console.error(
            "Error calculating progress for course:",
            course._id,
            innerErr.message
          );
          return {
            ...course.toObject(),
            totalSubSections: 0,
            completedVideos: 0,
            progressPercentage: 0,
          };
        }
      })
    );

    return res.status(200).json({
      success: true,
      data: coursesWithProgress,
    });
  } catch (error) {
    console.error("getEnrolledCourses crashed:", error);
    return res.status(500).json({
      success: false,
      message: "Could not fetch enrolled courses",
      error: error.message,
    });
  }
};

// ─── Instructor Dashboard ─────────────────────────────────────────────────────
exports.instructorDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const instructorCourses = await Course.find({ instructor: userId })
      .populate("studentsEnrolled", "_id")
      .populate("ratingAndReviews");

    const dashboardData = instructorCourses.map((course) => {
      const totalStudents = course.studentsEnrolled?.length || 0;
      const totalRevenue = totalStudents * (course.price || 0);

      const avgRating =
        course.ratingAndReviews?.length > 0
          ? course.ratingAndReviews.reduce((acc, r) => acc + r.rating, 0) /
            course.ratingAndReviews.length
          : 0;

      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        price: course.price,
        totalStudents,
        totalRevenue,
        avgRating: Math.round(avgRating * 10) / 10,
        status: course.status,
      };
    });

    return res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error("instructorDashboard error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch instructor dashboard",
      error: error.message,
    });
  }
};