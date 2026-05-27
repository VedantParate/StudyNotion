// backend/utils/imageUploader.js
// FIXED: If the bucket is public, getPublicUrl works fine.
// If it is private (Supabase default), getPublicUrl returns a URL the
// browser cannot access → video silently fails. This file now tries the
// public URL first; if the bucket is private it falls back to a 10-year
// signed URL so the browser can always reach the file.

const supabase = require("../config/supabase");
const path = require("path");
const fs = require("fs");

const TEN_YEARS_SECONDS = 60 * 60 * 24 * 365 * 10; // 315,360,000 s

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  try {
    const fileExt = path.extname(file.name);
    const fileName = `${folder}/${Date.now()}${fileExt}`;
    const bucket = process.env.SUPABASE_BUCKET;

    // Upload file
    const fileBuffer = fs.readFileSync(file.tempFilePath);
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, fileBuffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      throw new Error(uploadError.message);
    }

    // Try public URL first (works when bucket is Public in Supabase dashboard)
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    // Verify the public URL is actually reachable (bucket is public)
    // by checking the URL format – Supabase always returns a URL even for
    // private buckets, but fetching it will 400. We cannot do an HTTP check
    // here cheaply, so we attempt a signed-URL as the safe default when
    // the env flag SUPABASE_BUCKET_PUBLIC is not set to "true".
    if (process.env.SUPABASE_BUCKET_PUBLIC === "true") {
      // Bucket is explicitly configured as public → use the public URL
      return { secure_url: urlData.publicUrl };
    }

    // Bucket is private (default) → generate a long-lived signed URL so
    // the browser can stream the video without authentication.
    const { data: signedData, error: signedError } = await supabase.storage
      .from(bucket)
      .createSignedUrl(fileName, TEN_YEARS_SECONDS);

    if (signedError) {
      console.error("Supabase signed URL error:", signedError);
      // Last-resort fallback: return public URL and let Supabase dashboard
      // setting decide access.
      return { secure_url: urlData.publicUrl };
    }

    return { secure_url: signedData.signedUrl };
  } catch (err) {
    console.error("uploadImageToCloudinary (Supabase) error:", err);
    throw err;
  }
};
