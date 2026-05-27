// src/components/core/Catalog/CourseCard.jsx

import { useEffect, useState } from "react"
import { useSelector }         from "react-redux"
import { Link }                from "react-router-dom"
import { FaStar }              from "react-icons/fa"

export default function CourseCard({ course, Height }) {
  const { user } = useSelector((state) => state.profile)
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count =
      course?.ratingAndReviews?.reduce(
        (acc, curr) => acc + curr.rating,
        0
      ) / course?.ratingAndReviews?.length || 0
    setAvgReviewCount(count)
  }, [course])

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="rounded-lg bg-richblack-800">

        {/* Thumbnail */}
        <div className="relative">
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            className={`${Height} w-full rounded-xl object-cover`}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 px-1 py-3">

          {/* Course Name */}
          <p className="text-sm font-medium text-richblack-5">
            {course?.courseName}
          </p>

          {/* Instructor */}
          <p className="text-xs text-richblack-50">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-yellow-25">
              {avgReviewCount.toFixed(1) || "0"}
            </span>
            <div className="flex gap-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  size={12}
                  className={
                    i < Math.round(avgReviewCount)
                      ? "text-yellow-25"
                      : "text-richblack-400"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-richblack-400">
              ({course?.ratingAndReviews?.length} ratings)
            </span>
          </div>

          {/* Price */}
          <p className="text-sm font-semibold text-richblack-5">
            Rs. {course?.price}
          </p>

        </div>
      </div>
    </Link>
  )
}