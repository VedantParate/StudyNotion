// src/components/core/Dashboard/EnrolledCourses.jsx

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getEnrolledCourses } from "../../../services/operations/studentFeaturesAPI"
import Spinner from "../../common/Spinner"

// FIX: @ramonak/react-progress-bar is a CJS package. Vite's ESM wrapper makes
// the default import an object { default: <fn> } instead of the component directly.
// Unwrap it the same way we fixed react-rating-stars-component in CourseDetails.jsx.
import ProgressBarModule from "@ramonak/react-progress-bar"
const ProgressBar = ProgressBarModule?.default ?? ProgressBarModule

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate  = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  async function getEnrolled() {
    const response = await getEnrolledCourses(token)
    setEnrolledCourses(response)
  }

  useEffect(() => {
    getEnrolled()
  }, [])

  if (!enrolledCourses) return <Spinner />

  return (
    <div className="mx-auto w-full max-w-[800px]">

      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Enrolled Courses
      </h1>

      {enrolledCourses.length === 0 ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.{" "}
          <span
            onClick={() => navigate("/catalog")}
            className="cursor-pointer text-yellow-50 underline"
          >
            Browse Courses
          </span>
        </p>
      ) : (
        <div className="my-8 text-richblack-5">

          {/* Table Header */}
          <div className="flex rounded-t-lg bg-richblack-500">
            <p className="w-[45%] py-3 pl-5 text-sm font-medium text-richblack-100">
              Course Name
            </p>
            <p className="w-[25%] py-3 text-sm font-medium text-richblack-100">
              Duration
            </p>
            <p className="flex-1 py-3 text-sm font-medium text-richblack-100">
              Progress
            </p>
          </div>

          {/* Table Rows */}
          {enrolledCourses.map((course, index) => (
            <div
              key={course._id}
              className={`flex items-center border border-richblack-700 ${
                index === enrolledCourses.length - 1
                  ? "rounded-b-lg"
                  : "rounded-none"
              }`}
            >
              {/* Course Name + Thumbnail */}
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 py-3 pl-5"
                onClick={() =>
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }
              >
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold text-richblack-5">
                    {course.courseName}
                  </p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription?.length > 50
                      ? course.courseDescription.slice(0, 50) + "..."
                      : course.courseDescription}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="w-[25%] py-3">
                <p className="text-sm text-richblack-100">
                  {course?.totalDuration ?? "—"}
                </p>
              </div>

              {/* Progress */}
              <div className="flex w-1/5 flex-col gap-2 py-3">
                <p className="text-sm text-richblack-100">
                  Progress: {course.progressPercentage ?? 0}%
                </p>
                <ProgressBar
                  completed={course.progressPercentage ?? 0}
                  height="8px"
                  isLabelVisible={false}
                  bgColor="#FFD60A"
                  baseBgColor="#2C333F"
                />
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  )
}
