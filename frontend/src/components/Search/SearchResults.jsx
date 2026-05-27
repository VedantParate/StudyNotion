import { useNavigate } from "react-router-dom"
import { HiOutlineClock } from "react-icons/hi"
import { FiUser } from "react-icons/fi"

export default function SearchResults({ results, query }) {
  const navigate = useNavigate()

  if (!results) return null

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-richblack-400">
        <p className="text-lg">No courses found for</p>
        <p className="text-2xl font-semibold text-richblack-5">"{query}"</p>
        <p className="text-sm">Try different keywords or browse our catalog</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((course) => (
        <div
          key={course._id}
          onClick={() => navigate(`/courses/${course._id}`)}
          className="cursor-pointer rounded-xl border border-richblack-700 bg-richblack-800 overflow-hidden hover:border-yellow-50 hover:shadow-lg transition-all"
        >
          {/* Thumbnail */}
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="h-48 w-full object-cover"
          />

          {/* Info */}
          <div className="flex flex-col gap-2 p-4">
            <p className="font-semibold text-richblack-5 leading-snug line-clamp-2">
              {course.courseName}
            </p>
            <p className="text-xs text-richblack-400 line-clamp-2">
              {course.courseDescription}
            </p>

            {/* Meta */}
            <div className="mt-2 flex items-center justify-between text-xs text-richblack-300">
              <span className="flex items-center gap-1">
                <FiUser />
                {course.instructor?.firstName} {course.instructor?.lastName}
              </span>
              <span className="flex items-center gap-1">
                <HiOutlineClock />
                {course.totalDuration ?? "—"}
              </span>
            </div>

            {/* Price + Category */}
            <div className="mt-2 flex items-center justify-between">
              <span className="rounded-full bg-richblack-700 px-3 py-1 text-xs text-richblack-200">
                {course.category?.name ?? "General"}
              </span>
              <span className="font-semibold text-yellow-50">
                {course.price === 0 ? "Free" : `₹${course.price}`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}