// src/components/core/Dashboard/InstructorDashboard/index.jsx

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getInstructorData } from "../../../../services/operations/instructorAPI"
import Spinner from "../../../common/Spinner"
import InstructorChart from "./InstructorChart"

export default function InstructorDashboard() {
  const { token } = useSelector((state) => state.auth)
  const { user }  = useSelector((state) => state.profile)
  const navigate  = useNavigate()

  const [loading,        setLoading]        = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses,        setCourses]        = useState([])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const data = await getInstructorData(token)
      setInstructorData(data || [])
      setCourses(data || [])          // ← fix: fallback to [] if data is null
      setLoading(false)
    }
    fetchData()
  }, [])

  // ← fix: field names now match what the backend actually returns
  const totalStudents = courses.reduce(
    (acc, curr) => acc + (curr.totalStudents ?? 0),
    0
  )
  const totalRevenue = courses.reduce(
    (acc, curr) => acc + (curr.totalRevenue ?? 0),
    0
  )

  if (loading) return <Spinner />

  return (
    <div className="mx-auto w-full max-w-[800px]">

      {/* Page Heading */}
      <div className="mb-14 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium text-richblack-5">
            Hi, {user?.firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-richblack-400">
            Let's start something new
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="rounded-md bg-yellow-50 px-5 py-2 font-semibold
                     text-richblack-900"
        >
          + New Course
        </button>
      </div>

      {courses.length > 0 ? (
        <>
          {/* Stats + Chart */}
          <div className="mb-8 flex flex-col gap-6 lg:flex-row">

            {/* Stats Cards */}
            <div className="flex flex-col gap-y-4">
              <div className="rounded-md border border-richblack-700
                              bg-richblack-800 p-6">
                <p className="text-lg font-semibold text-richblack-5">
                  {courses.length}
                </p>
                <p className="text-sm text-richblack-400">Total Courses</p>
              </div>

              <div className="rounded-md border border-richblack-700
                              bg-richblack-800 p-6">
                <p className="text-lg font-semibold text-richblack-5">
                  {totalStudents}
                </p>
                <p className="text-sm text-richblack-400">Total Students</p>
              </div>

              <div className="rounded-md border border-richblack-700
                              bg-richblack-800 p-6">
                <p className="text-lg font-semibold text-richblack-5">
                  ₹ {totalRevenue}
                </p>
                <p className="text-sm text-richblack-400">Total Revenue</p>
              </div>
            </div>

            {/* Pie Chart */}
            <InstructorChart courses={courses} />

          </div>

          {/* Your Courses */}
          <div className="rounded-md border border-richblack-700
                          bg-richblack-800 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-lg font-semibold text-richblack-5">
                Your Courses
              </p>
              <button
                onClick={() => navigate("/dashboard/my-courses")}
                className="text-sm font-medium text-yellow-50"
              >
                View All
              </button>
            </div>

            <div className="flex flex-col gap-y-4">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="flex items-center gap-x-4">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[50px] w-[50px] rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <p className="font-medium text-richblack-5">
                      {course.courseName}
                    </p>
                    <div className="flex items-center gap-x-4 text-xs
                                    text-richblack-300">
                      {/* ← fix: field names match backend response */}
                      <span>{course.totalStudents} students</span>
                      <span>|</span>
                      <span>₹ {course.totalRevenue}</span>
                    </div>
                  </div>
                  <div className={`rounded-full px-3 py-1 text-xs font-medium
                                  bg-richblack-700 ${
                                    course.status === "Published"
                                      ? "text-yellow-50"
                                      : "text-richblack-300"
                                  }`}>
                    {course.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
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