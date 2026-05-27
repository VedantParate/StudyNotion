// src/components/core/Dashboard/EditCourse/index.jsx

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"

import { getCourseDetails }          from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse }  from "../../../../slices/courseSlice"
import RenderSteps                   from "../AddCourse/RenderSteps"
import Spinner                       from "../../../common/Spinner"

export default function EditCourse() {
  const { courseId } = useParams()
  const dispatch     = useDispatch()
  const { token }    = useSelector((state) => state.auth)
  const { course }   = useSelector((state) => state.course)

  const [loading, setLoading] = [
    !course,
    () => {},
  ]

  useEffect(() => {
    async function fetchCourse() {
      const result = await getCourseDetails(courseId)
      if (result?.courseDetails) {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result.courseDetails))
      } else {
        toast.error("Could not fetch course details")
      }
    }
    fetchCourse()
  }, [courseId, dispatch])

  if (!course) return <Spinner />

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