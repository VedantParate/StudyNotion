// backend/controllers/Category.js

const Category = require("../models/Category");
const Course = require("../models/Course");

// ─── Create Category ──────────────────────────────────────────────────────────
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = await Category.create({ name, description });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("createCategory error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

// ─── Show All Categories ──────────────────────────────────────────────────────
exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({}, { name: 1, description: 1 });

    return res.status(200).json({
      success: true,
      message: "All categories fetched successfully",
      data: allCategories,
    });
  } catch (error) {
    console.error("showAllCategories error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

// ─── Get Category Page Details ────────────────────────────────────────────────
exports.getCategoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "categoryId is required",
      });
    }

    // Selected category with its published courses
    const selectedCategory = await Category.findById(categoryId).populate({
      path: "courses",
      match: { status: "Published" },
      populate: [
        { path: "instructor", select: "firstName lastName image" },
        { path: "ratingAndReviews" },
      ],
    });

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Other categories (for "Students also viewed" etc.)
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: { path: "instructor", select: "firstName lastName" },
      })
      .limit(4);

    // Most selling courses across all categories
    const mostSellingCourses = await Course.find({ status: "Published" })
      .populate("instructor", "firstName lastName image")
      .populate("ratingAndReviews")
      .sort({ studentsEnrolled: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.error("getCategoryPageDetails error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch category page details",
      error: error.message,
    });
  }
};