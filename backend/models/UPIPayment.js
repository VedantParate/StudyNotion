// backend/models/UPIPayment.js

const mongoose = require("mongoose")

const upiPaymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      // FIX: removed `unique: true` here — same UTR covers multiple courses in a cart.
      // Uniqueness is now enforced per (transactionId + course) pair via the
      // compound index below, which is checked in the controller before inserting.
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
)

// One student can only submit the same UTR for the same course once
upiPaymentSchema.index({ transactionId: 1, course: 1 }, { unique: true })

module.exports = mongoose.model("UPIPayment", upiPaymentSchema)
