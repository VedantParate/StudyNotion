// backend/controllers/courseProgress.js
// Was just a code fragment before — now a complete working controller.

const CourseProgress = require("../models/CourseProgress")
const Course         = require("../models/Course")
const User           = require("../models/User")
const mailSender     = require("../utils/mailSender")
const courseCompletionEmail = require("../mail/templates/courseCompletion")

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body
    const userId = req.user.id

    if (!courseId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "courseId and subSectionId are required",
      })
    }

    // Find or create a CourseProgress document for this user+course
    let courseProgress = await CourseProgress.findOne({ courseID: courseId, userId })

    if (!courseProgress) {
      courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId,
        completedVideos: [],
      })
    }

    // Add subSectionId if not already marked complete
    const alreadyDone = courseProgress.completedVideos
      .map(String)
      .includes(String(subSectionId))

    if (!alreadyDone) {
      courseProgress.completedVideos.push(subSectionId)
      await courseProgress.save()
    }

    // Check if the entire course is now complete
    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: { path: "subSection" },
    })

    if (course) {
      const allSubSectionIds = course.courseContent
        .flatMap((section) => section.subSection)
        .map((sub) => sub._id.toString())

      const completedIds = courseProgress.completedVideos.map(String)
      const courseComplete = allSubSectionIds.every((id) => completedIds.includes(id))

      if (courseComplete) {
        // Send congratulations email
        const student = await User.findById(userId)
        if (student) {
          await mailSender(
            student.email,
            "Congratulations! Course Completed — StudyNotion",
            courseCompletionEmail(
              `${student.firstName} ${student.lastName}`,
              course.courseName
            )
          )
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: "Course progress updated successfully",
    })
  } catch (error) {
    console.error("updateCourseProgress error:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to update course progress",
      error: error.message,
    })
  }
}
