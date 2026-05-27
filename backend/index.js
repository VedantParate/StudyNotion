// backend/index.js

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const os = require("os");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnect } = require("./config/database");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const paymentRoutes = require("./routes/payment");
const profileRoutes = require("./routes/profile");

const PORT = process.env.PORT || 4000;

// Connect to DB
dbConnect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://study-notion-git-master-vedantparates-projects.vercel.app",
      "https://study-notion-dhor8q3al-vedantparates-projects.vercel.app",
    ]
    // Allow all vercel preview deployments
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}))
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(), // ✅ works on Windows & Linux & deployment
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB file size limit
  })
);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Server is up and running 🚀",
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});