// src/components/core/Catalog/CourseCardTwo.jsx

import { useEffect, useState } from "react"
import { Link }                from "react-router-dom"
import { FaStar }              from "react-icons/fa"
import { MdOutlineAccessTime } from "react-icons/md"

export default function CourseCardTwo({ course }) {
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
    <Link to={`/courses/${course?._id}`}>
      <div className="flex flex-col rounded-xl bg-richblack-800 transition-all
                      duration-200 hover:bg-richblack-700">

        {/* Thumbnail */}
        <img
          src={course?.thumbnail}
          alt={course?.courseName}
          className="h-[220px] w-full rounded-t-xl object-cover"
        />

        {/* Info */}
        <div className="flex flex-col gap-3 p-4">

          {/* Name */}
          <p className="text-lg font-semibold text-richblack-5">
            {course?.courseName}
          </p>

          {/* Instructor */}
          <p className="text-sm text-richblack-100">
            By {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-yellow-25">
              {avgReviewCount.toFixed(1)}
            </span>
            <div className="flex gap-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  size={13}
                  className={
                    i < Math.round(avgReviewCount)
                      ? "text-yellow-25"
                      : "text-richblack-400"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-richblack-400">
              ({course?.ratingAndReviews?.length})
            </span>
          </div>

          {/* Price */}
          <p className="text-xl font-bold text-richblack-5">
            Rs. {course?.price}
          </p>

        </div>
      </div>
    </Link>
  )
}