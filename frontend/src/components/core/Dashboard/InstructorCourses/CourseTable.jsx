// src/components/core/Dashboard/InstructorCourses/CourseTable.jsx

import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { COURSE_STATUS } from "../../../../utils/constants"
import { deleteCourse }         from "../../../../services/operations/courseOperationsAPI"
import { getInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import ConfirmationModal        from "../../../common/ConfirmationModal"
import Spinner                  from "../../../common/Spinner"

const TRUNCATE_LENGTH = 30

export default function CourseTable({ courses, setCourses }) {
  const { token }  = useSelector((state) => state.auth)
  const navigate   = useNavigate()

  const [loading,           setLoading]           = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  async function handleCourseDelete(courseId) {
    setLoading(true)
    await deleteCourse({ courseId }, token)
    const result = await getInstructorCourses(token)
    setCourses(result)
    setLoading(false)
    setConfirmationModal(null)
  }

  if (loading) return <Spinner />

  return (
    <>
      <div className="rounded-xl border border-richblack-800">

        {/* Table Header */}
        <div className="flex gap-x-4 rounded-t-md bg-richblack-500 px-6 py-3">
          <p className="flex-1 text-sm font-medium text-richblack-100">
            Courses
          </p>
          <p className="w-[100px] text-sm font-medium text-richblack-100">
            Duration
          </p>
          <p className="w-[100px] text-sm font-medium text-richblack-100">
            Price
          </p>
          <p className="w-[100px] text-sm font-medium text-richblack-100">
            Actions
          </p>
        </div>

        {/* Table Rows */}
        {courses.map((course) => (
          <div
            key={course._id}
            className="flex gap-x-4 border-b border-richblack-800 px-6 py-8"
          >
            {/* Left — Thumbnail + Info */}
            <div className="flex flex-1 gap-x-4">
              {/* Thumbnail */}
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="h-[148px] w-[220px] rounded-lg object-cover"
              />

              {/* Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-lg font-semibold text-richblack-5">
                    {course.courseName}
                  </p>
                  <p className="mt-1 text-xs text-richblack-300">
                    {course.courseDescription?.length > TRUNCATE_LENGTH
                      ? course.courseDescription.slice(0, TRUNCATE_LENGTH) + "..."
                      : course.courseDescription}
                  </p>
                </div>

                {/* Created Date */}
                <p className="text-xs text-richblack-100">
                  Created:{" "}
                  {new Date(course.createdAt).toLocaleDateString("en-IN", {
                    day:   "2-digit",
                    month: "short",
                    year:  "numeric",
                  })}
                </p>

                {/* Status Badge */}
                {course.status === COURSE_STATUS.DRAFT ? (
                  <span className="w-fit rounded-full bg-richblack-700
                                   px-2 py-1 text-xs font-medium text-pink-100">
                    Draft
                  </span>
                ) : (
                  <span className="w-fit rounded-full bg-richblack-700
                                   px-2 py-1 text-xs font-medium text-yellow-100">
                    Published
                  </span>
                )}
              </div>
            </div>

            {/* Duration */}
            <div className="w-[100px]">
              <p className="text-sm text-richblack-100">
                {course?.totalDuration ?? "—"}
              </p>
            </div>

            {/* Price */}
            <div className="w-[100px]">
              <p className="text-sm font-medium text-richblack-100">
                ₹ {course.price}
              </p>
            </div>

            {/* Actions */}
            <div className="flex w-[100px] flex-col gap-y-2">
              {/* Edit */}
              <button
                onClick={() =>
                  navigate(`/dashboard/edit-course/${course._id}`)
                }
                className="flex items-center gap-x-1 rounded-md px-2 py-1
                           text-sm text-richblack-300 hover:text-richblack-5
                           transition-all"
              >
                <FaEdit size={16} />
                Edit
              </button>

              {/* Delete */}
              <button
                onClick={() =>
                  setConfirmationModal({
                    text1:       "Do you want to delete this course?",
                    text2:       "All the data related to this course will be deleted.",
                    btn1Text:    "Delete",
                    btn2Text:    "Cancel",
                    btn1Handler: () => handleCourseDelete(course._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
                className="flex items-center gap-x-1 rounded-md px-2 py-1
                           text-sm text-richblack-300 hover:text-pink-200
                           transition-all"
              >
                <RiDeleteBin6Line size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  )
}