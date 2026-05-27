// backend/controllers/SubSection.js
// FIXES applied:
// 1. timeDuration no longer saved as "undefined" — Supabase doesn't return
//    `duration` like Cloudinary did. Defaults to "0" if not present.
// 2. deleteSubSection re-added (was accidentally dropped in previous fix).

const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// ─── Create SubSection ────────────────────────────────────────────────────────
exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files?.video;

    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // ✅ FIX: Supabase doesn't return `duration`; guard against "undefined"
    const duration = uploadDetails.duration
      ? `${uploadDetails.duration}`
      : "0";

    const newSubSection = await SubSection.create({
      title,
      timeDuration: duration,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: newSubSection._id } },
      { new: true }
    ).populate("subSection");

    res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create subSection",
      error: error.message,
    });
  }
};

// ─── Update SubSection ────────────────────────────────────────────────────────
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description } = req.body;

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title) subSection.title = title;
    if (description) subSection.description = description;

    if (req.files?.video) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      // ✅ FIX: same guard for the update path
      subSection.timeDuration = uploadDetails.duration
        ? `${uploadDetails.duration}`
        : "0";
    }

    await subSection.save();

    res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: subSection,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update subSection",
      error: error.message,
    });
  }
};

// ─── Delete SubSection ────────────────────────────────────────────────────────
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    // Remove subSection reference from its parent section
    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSection: subSectionId },
    });

    // Delete the subSection document
    await SubSection.findByIdAndDelete(subSectionId);

    res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete subSection",
      error: error.message,
    });
  }
};
