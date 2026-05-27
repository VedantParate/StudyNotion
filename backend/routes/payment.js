// backend/routes/payment.js

const express = require("express")
const router  = express.Router()

const { submitUPIPayment } = require("../controllers/payments")
const { auth }             = require("../middlewares/auth")

// FIX: removed isStudent middleware — isStudent blocks Admin/Instructor accounts.
// auth alone is sufficient: any logged-in user can enroll in a course.
router.post("/upiSubmit", auth, submitUPIPayment)

module.exports = router
