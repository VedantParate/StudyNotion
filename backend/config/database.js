const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected successfully ✅"))
    .catch((error) => {
      console.log("DB connection failed ❌");
      console.error(error);
      process.exit(1);
    });
};