// frontend/src/pages/ViewCourse.jsx

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setCourseEntireData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"
// import VideoDetailsSidebar from "../components/ViewCourse/VideoDetailsSidebar"
// import CourseReviewModal from "../components/ViewCourse/CourseReviewModal"
import CourseReviewModal from "../components/core/Course/CourseReviewModal"
import VideoDetailsSidebar from "../components/ViewCourse/VideoDetailsSidebar"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      if (!courseData) return
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setCourseEntireData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData.courseDetails.courseContent.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    }
    setCourseSpecificDetails()
  }, [courseId])

  return (
    <div className="relative flex min-h-screen flex-col bg-richblack-900 text-white">
      {/* Top bar */}
      <div className="flex h-14 items-center justify-between border-b border-richblack-700 bg-richblack-800 px-6">
        <span className="text-lg font-semibold text-richblack-5">StudyNotion</span>
        <button
          onClick={() => setReviewModal(true)}
          className="rounded-md bg-yellow-50 px-4 py-1.5 text-sm font-semibold text-richblack-900 hover:bg-yellow-25 transition-all"
        >
          Add Review
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  )
}