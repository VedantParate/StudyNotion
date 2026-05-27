import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getAllCoursesAdmin, deleteCourseAdmin } from "../../services/operations/adminAPI"
import Spinner from "../common/Spinner"
import { FiTrash2 } from "react-icons/fi"

export default function ManageCourses() {
  const { token } = useSelector((state) => state.auth)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCourses = async () => {
    const data = await getAllCoursesAdmin(token)
    setCourses(data)
    setLoading(false)
  }

  useEffect(() => { fetchCourses() }, [])

  const handleDelete = async (courseId) => {
    if (!window.confirm("Delete this course?")) return
    const success = await deleteCourseAdmin(courseId, token)
    if (success) setCourses((prev) => prev.filter((c) => c._id !== courseId))
  }

  if (loading) return <Spinner />

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-richblack-5">
        Manage Courses
        <span className="ml-2 text-base font-normal text-richblack-400">
          ({courses.length})
        </span>
      </h2>

      <div className="overflow-hidden rounded-xl border border-richblack-700">
        <table className="w-full text-sm">
          <thead className="bg-richblack-700 text-richblack-100">
            <tr>
              <th className="px-4 py-3 text-left">Course</th>
              <th className="px-4 py-3 text-left">Instructor</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-richblack-700">
            {courses.map((course) => (
              <tr key={course._id} className="bg-richblack-800 hover:bg-richblack-700 transition-colors">
                <td className="flex items-center gap-3 px-4 py-3">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-10 w-16 rounded object-cover"
                  />
                  <span className="max-w-[160px] truncate text-richblack-5">
                    {course.courseName}
                  </span>
                </td>
                <td className="px-4 py-3 text-richblack-300">
                  {course.instructor?.firstName} {course.instructor?.lastName}
                </td>
                <td className="px-4 py-3 text-richblack-300">
                  {course.category?.name ?? "—"}
                </td>
                <td className="px-4 py-3 text-yellow-50 font-semibold">
                  {course.price === 0 ? "Free" : `₹${course.price}`}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    course.status === "Published"
                      ? "bg-green-900 text-green-200"
                      : "bg-richblack-600 text-richblack-200"
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="rounded-lg p-2 text-pink-400 hover:bg-richblack-600 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {courses.length === 0 && (
          <p className="py-10 text-center text-richblack-400">No courses found</p>
        )}
      </div>
    </div>
  )
}