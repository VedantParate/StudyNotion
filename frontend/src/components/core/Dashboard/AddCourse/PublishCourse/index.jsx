// src/components/core/Dashboard/AddCourse/PublishCourse/index.jsx

import { useEffect, useState } from "react"
import { useForm }             from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate }         from "react-router-dom"
import { toast }               from "react-hot-toast"

import { editCourse }                    from "../../../../../services/operations/courseOperationsAPI"
import { resetCourseState, setStep }     from "../../../../../slices/courseSlice"
import { COURSE_STATUS }                 from "../../../../../utils/constants"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch   = useDispatch()
  const navigate   = useNavigate()
  const { token }  = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  const [loading, setLoading] = useState(false)

  // Pre-tick checkbox if course is already published
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [course, setValue])

  function goBack() {
    dispatch(setStep(2))
  }

  function goToDashboard() {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  async function onSubmit(data) {
    // Only call API if status actually changed
    if (
      (data.public  && course.status === COURSE_STATUS.PUBLISHED) ||
      (!data.public && course.status === COURSE_STATUS.DRAFT)
    ) {
      goToDashboard()
      return
    }

    const formData = new FormData()
    formData.append("courseId", course._id)
    formData.append(
      "status",
      data.public ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    )

    setLoading(true)
    const result = await editCourse(formData, token)
    setLoading(false)

    if (result) {
      goToDashboard()
    } else {
      toast.error("Could not update course status")
    }
  }

  return (
    <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-8">

      {/* Heading */}
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Course
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Checkbox */}
        <div className="flex items-start gap-x-3">
          <input
            type="checkbox"
            id="public"
            className="h-4 w-4 cursor-pointer rounded bg-richblack-500"
            {...register("public")}
          />
          <label
            htmlFor="public"
            className="cursor-pointer text-sm text-richblack-300"
          >
            Make this course public and available to students
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-x-4">
          {/* Back */}
          <button
            type="button"
            disabled={loading}
            onClick={goBack}
            className="rounded-md bg-richblack-700 px-5 py-2 font-semibold
                       text-richblack-50 disabled:opacity-60"
          >
            Back
          </button>

          {/* Save & Continue */}
          <button
            type="button"
            disabled={loading}
            onClick={goToDashboard}
            className="rounded-md bg-richblack-700 px-5 py-2 font-semibold
                       text-richblack-50 disabled:opacity-60"
          >
            Save as Draft
          </button>

          {/* Publish */}
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-yellow-50 px-5 py-2 font-semibold
                       text-richblack-900 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Publish Course"}
          </button>
        </div>

      </form>
    </div>
  )
}