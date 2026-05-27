// const Razorpay = require("razorpay");
// require("dotenv").config();

// exports.instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

const Razorpay = require("razorpay");
require("dotenv").config();

let instance;

if (process.env.RAZORPAY_KEY && process.env.RAZORPAY_SECRET) {
  instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });
} else {
  console.log("Razorpay keys not found — payment disabled ⚠️");
}

exports.instance = instance;