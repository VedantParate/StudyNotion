// src/components/core/Dashboard/AddCourse/index.jsx

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setStep } from "../../../../slices/courseSlice"
import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  const { editCourse } = useSelector((state) => state.course)
  const dispatch       = useDispatch()

  // Always start from step 1 when landing on Add Course
  useEffect(() => {
    dispatch(setStep(1))
  }, [])

  return (
    <div className="mx-auto w-full max-w-[600px]">

      {/* Page Heading */}
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        {editCourse ? "Edit Course" : "Add Course"}
      </h1>

      {/* Step Indicator + Active Form */}
      <div className="flex flex-col gap-y-6">
        <RenderSteps />
      </div>

    </div>
  )
}