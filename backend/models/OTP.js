const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
})

async function sendVerificationEmail(email, otp) {
  try {
    await mailSender(
      email,
      "Verification Email - StudyNotion",
      `<h2>Your OTP is: ${otp}</h2><p>This OTP is valid for 5 minutes only.</p>`
    )
  } catch (error) {
    console.error("Error sending OTP email:", error)
    throw error
  }
}

// ✅ MUST be regular function, NOT arrow function
otpSchema.pre("save", async function(next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp)
  }
  // next()
})

module.exports = mongoose.model("OTP", otpSchema)