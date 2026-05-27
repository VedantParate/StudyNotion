// src/components/core/Dashboard/EditCourse.jsx

import { useEffect, useState } from "react"
import { useParams }           from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast }               from "react-hot-toast"

import { getCourseDetails }         from "../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../slices/courseSlice"
import RenderSteps                  from "./AddCourse/RenderSteps"
import Spinner                      from "../../common/Spinner"

export default function EditCourse() {
  const { courseId } = useParams()
  const dispatch     = useDispatch()
  const { token }    = useSelector((state) => state.auth)
  const { course }   = useSelector((state) => state.course)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchCourse() {
      setLoading(true)
      const result = await getCourseDetails(courseId)
      if (result) {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result))
      } else {
        toast.error("Could not fetch course details")
      }
      setLoading(false)
    }
    fetchCourse()
  }, [courseId, dispatch])

  if (loading) return <Spinner />

  if (!course) return (
    <p className="text-richblack-300 text-center mt-10">
      Course not found.
    </p>
  )

  return (
    <div className="mx-auto w-full max-w-[600px]">

      {/* Page Heading */}
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>

      {/* Reuse the same 3-step form as Add Course */}
      <div className="flex flex-col gap-y-6">
        <RenderSteps />
      </div>

    </div>
  )
}