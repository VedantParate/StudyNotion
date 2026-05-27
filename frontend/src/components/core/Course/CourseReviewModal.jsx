// frontend/src/components/core/ViewCourse/CourseReviewModal.jsx

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { createRating } from "../../../services/operations/courseDetailsAPI"

// ✅ Custom Star — zero external dependencies
const StarRating = ({ onRatingChange }) => {
  const [hovered, setHovered] = useState(0)
  const [selected, setSelected] = useState(0)

  const handleClick = (star) => {
    setSelected(star)
    onRatingChange(star)
  }

  return (
    <div style={{ display: "flex", gap: "8px", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleClick(star)}
          style={{
            fontSize: "32px",
            color: star <= (hovered || selected) ? "#ffd700" : "#ccc",
            transition: "color 0.15s",
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
  }, [])

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "grid",
        placeItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "600px",
          borderRadius: "12px",
          backgroundColor: "#161D29",
          border: "1px solid #424854",
          margin: "40px auto",
        }}
      >
        {/* ✅ Header — plain × character, no icon package */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#1E2A38",
            padding: "16px 20px",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <p style={{ color: "#F1F2FF", fontSize: "18px", fontWeight: 600 }}>
            Add Review
          </p>
          <button
            onClick={() => setReviewModal(false)}
            style={{
              background: "none",
              border: "none",
              color: "#F1F2FF",
              fontSize: "22px",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          {/* User Info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src={user?.image}
              alt={user?.firstName}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <p
              style={{
                marginTop: "8px",
                color: "#F1F2FF",
                fontWeight: 600,
              }}
            >
              {user?.firstName} {user?.lastName}
            </p>
            <p style={{ color: "#838894", fontSize: "13px" }}>
              Posting Publicly
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* Stars */}
            <StarRating
              onRatingChange={(rating) => setValue("courseRating", rating)}
            />

            {/* Hidden rating input */}
            <input
              type="number"
              {...register("courseRating", { required: true, min: 1 })}
              style={{ display: "none" }}
            />
            {errors.courseRating && (
              <span style={{ color: "#EF476F", fontSize: "13px" }}>
                Please select a rating
              </span>
            )}

            {/* Textarea */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                htmlFor="courseExperience"
                style={{ color: "#F1F2FF", fontSize: "14px", fontWeight: 600 }}
              >
                Add Your Experience{" "}
                <sup style={{ color: "#FF6B6B" }}>*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Write your experience here..."
                {...register("courseExperience", { required: true })}
                style={{
                  width: "100%",
                  minHeight: "120px",
                  backgroundColor: "#2C333F",
                  color: "#F1F2FF",
                  border: "1px solid #424854",
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: "14px",
                  resize: "none",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {errors.courseExperience && (
                <span style={{ color: "#EF476F", fontSize: "13px" }}>
                  Please add your experience
                </span>
              )}
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                width: "100%",
              }}
            >
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  backgroundColor: "#838894",
                  color: "#000",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  backgroundColor: "#FFD60A",
                  color: "#000",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal