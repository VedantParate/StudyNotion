// src/components/core/Dashboard/Cart/RenderCartCourses.jsx

import { useDispatch, useSelector } from "react-redux"
import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses() {
  const { cart }  = useSelector((state) => state.cart)
  const dispatch  = useDispatch()

  return (
    <div className="flex flex-col gap-y-6">
      {cart.map((course, index) => (
        <div
          key={course._id}
          className={`flex flex-col sm:flex-row sm:items-start sm:justify-between
                      gap-6 pb-6 ${
                        index !== cart.length - 1
                          ? "border-b border-b-richblack-400"
                          : ""
                      }`}
        >
          {/* Left — Thumbnail + Info */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Thumbnail */}
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />

            {/* Course Info */}
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-5">
                {course?.courseName}
              </p>
              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-x-2">
                <span className="text-yellow-25 font-semibold">
                  {course?.averageRating || 0}
                </span>
                <div className="flex gap-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(course?.averageRating || 0)
                          ? "text-yellow-25"
                          : "text-richblack-400"
                      }
                      size={14}
                    />
                  ))}
                </div>
                <span className="text-sm text-richblack-400">
                  ({course?.ratingAndReviews?.length} ratings)
                </span>
              </div>
            </div>
          </div>

          {/* Right — Price + Remove */}
          <div className="flex flex-col items-end space-y-2">
            {/* Remove Button */}
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-600
                         bg-richblack-700 py-2 px-3 text-pink-200"
            >
              <RiDeleteBin6Line />
              <span className="text-sm">Remove</span>
            </button>

            {/* Price */}
            <p className="text-2xl font-medium text-yellow-50">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}