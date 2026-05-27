// backend/controllers/payments.js

const Course         = require("../models/Course")
const User           = require("../models/User")
const CourseProgress = require("../models/CourseProgress")
const UPIPayment     = require("../models/UPIPayment")
const mailSender     = require("../utils/mailSender")

// POST /api/v1/payment/upiSubmit
// Body: { courses: [courseId, ...], transactionId }
//
// Instantly enrolls the student — no admin approval needed.
//
exports.submitUPIPayment = async (req, res) => {
  try {
    const { courses, transactionId } = req.body
    const userId = req.user.id

    if (!courses || courses.length === 0 || !transactionId) {
      return res.status(400).json({
        success: false,
        message: "Please provide course IDs and transaction ID",
      })
    }

    const student = await User.findById(userId)
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" })
    }

    for (const courseId of courses) {
      const course = await Course.findById(courseId)
      if (!course) continue

      // FIX: check (transactionId + course) pair — not transactionId alone.
      // Same UTR is valid for multiple courses in a cart purchase.
      const duplicate = await UPIPayment.findOne({ transactionId, course: courseId })
      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: "This transaction ID has already been used for this course",
        })
      }

      // Skip if already enrolled
      if (course.studentsEnrolled.map(String).includes(String(userId))) continue

      // Enroll student in course
      await Course.findByIdAndUpdate(courseId, {
        $addToSet: { studentsEnrolled: userId },
      })

      // Add course to student profile
      await User.findByIdAndUpdate(userId, {
        $addToSet: { courses: courseId },
      })

      // Create course progress tracker
      await CourseProgress.create({
        courseID:        courseId,
        userId,
        completedVideos: [],
      })

      // Save payment record
      await UPIPayment.create({
        student:       userId,
        course:        courseId,
        transactionId,
        amount:        course.price,
        status:        "Verified",
      })

      // Send confirmation email (non-blocking)
      try {
        await mailSender(
          student.email,
          `You're enrolled in ${course.courseName} — StudyNotion`,
          `<h2>Hi ${student.firstName},</h2>
           <p>🎉 You have been successfully enrolled in <b>${course.courseName}</b>.</p>
           <p><b>Transaction ID:</b> ${transactionId}</p>
           <p>Start learning now on StudyNotion!</p>`
        )
      } catch (mailErr) {
        console.error("Mail error:", mailErr.message)
      }
    }

    return res.status(200).json({
      success: true,
      message: "Payment recorded and enrollment successful",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: error.message })
  }
}
