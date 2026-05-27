// src/components/core/Dashboard/MyCourses.jsx

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { VscAdd } from "react-icons/vsc"
import { getInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { deleteCourse } from "../../../services/operations/courseOperationsAPI"
import CourseTable from "./InstructorCourses/CourseTable"
import Spinner from "../../common/Spinner"

export default function MyCourses() {
  const { token }  = useSelector((state) => state.auth)
  const navigate   = useNavigate()

  const [courses,  setCourses]  = useState([])
  const [loading,  setLoading]  = useState(false)

  async function fetchCourses() {
    setLoading(true)
    try {
      const result = await getInstructorCourses(token)
      setCourses(result ?? [])  // ✅ Fallback if API returns null/undefined
    } catch (error) {
      console.error("fetchCourses failed:", error)
      setCourses([])  // ✅ Never leave courses undefined
    } finally {
      setLoading(false)  // ✅ Always runs, even on error
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="mx-auto w-full max-w-[800px]">

      {/* Page Heading + Add Button */}
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="flex items-center gap-x-2 rounded-md bg-yellow-50
                     px-5 py-2 font-semibold text-richblack-900"
        >
          <VscAdd />
          New Course
        </button>
      </div>

      {/* Course Table */}
      {courses.length > 0 ? (
        <CourseTable courses={courses} setCourses={setCourses} />
      ) : (
        <div className="grid min-h-[40vh] place-items-center rounded-md
                        border border-richblack-700 bg-richblack-800">
          <div className="text-center">
            <p className="text-2xl font-semibold text-richblack-5">
              You have not created any courses yet
            </p>
            <p className="mt-2 text-sm text-richblack-400">
              Create your first course and start teaching
            </p>
            <button
              onClick={() => navigate("/dashboard/add-course")}
              className="mt-6 rounded-md bg-yellow-50 px-5 py-2
                         font-semibold text-richblack-900"
            >
              Create Course
            </button>
          </div>
        </div>
      )}

    </div>
  )
}