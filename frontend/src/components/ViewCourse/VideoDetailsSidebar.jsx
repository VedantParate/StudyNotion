import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
// import { setSelectedSection } from "../../slices/viewCourseSlice"
// import IconBtn from "../Common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const { courseId, sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  // Auto-expand the active section on mount
  useEffect(() => {
    if (!courseSectionData.length) return
    const currentSectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    )
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((sub) => sub._id === subSectionId)

    setActiveStatus(courseSectionData[currentSectionIndex]?._id)
    setVideoBarActive(
      courseSectionData[currentSectionIndex]?.subSection[
        currentSubSectionIndex
      ]?._id
    )
  }, [courseSectionData, courseId, sectionId, subSectionId])

  return (
    <div className="flex h-full w-[320px] flex-col border-r border-richblack-700 bg-richblack-800">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-richblack-700 bg-richblack-700 p-4">
        <button
          onClick={() => navigate(`/dashboard/enrolled-courses`)}
          className="flex items-center gap-2 text-sm text-richblack-300 hover:text-richblack-50 transition-colors"
          title="Back to Enrolled Courses"
        >
          <IoIosArrowBack size={20} />
          <span>Back</span>
        </button>
        <button
          onClick={() => setReviewModal(true)}
          className="rounded bg-yellow-50 px-3 py-1 text-xs font-semibold text-richblack-900 hover:bg-yellow-25 transition-all"
        >
          Add Review
        </button>
      </div>

      {/* Course title + progress */}
      <div className="border-b border-richblack-700 p-4">
        <p className="text-sm font-semibold text-richblack-5">
          {courseEntireData?.courseName}
        </p>
        <p className="mt-1 text-xs text-richblack-400">
          {completedLectures.length} / {totalNoOfLectures} Completed
        </p>
        {/* Progress bar */}
        <div className="mt-2 h-1.5 w-full rounded-full bg-richblack-600">
          <div
            className="h-1.5 rounded-full bg-yellow-50 transition-all"
            style={{
              width: `${
                totalNoOfLectures === 0
                  ? 0
                  : (completedLectures.length / totalNoOfLectures) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {courseSectionData.map((section, sectionIndex) => (
          <div key={section._id} className="border-b border-richblack-700">
            {/* Section header */}
            <button
              className="flex w-full items-center justify-between gap-3 bg-richblack-700 px-4 py-3 text-left hover:bg-richblack-600 transition-colors"
              onClick={() =>
                setActiveStatus(
                  activeStatus === section._id ? "" : section._id
                )
              }
            >
              <span className="text-sm font-semibold text-richblack-5 leading-snug">
                {section.sectionName}
              </span>
              <BsChevronDown
                className={`shrink-0 text-richblack-300 transition-transform ${
                  activeStatus === section._id ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Sub-sections */}
            {activeStatus === section._id && (
              <div>
                {section.subSection.map((topic, topicIndex) => (
                  <button
                    key={topic._id}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseId}/section/${section._id}/sub-section/${topic._id}`
                      )
                      setVideoBarActive(topic._id)
                    }}
                    className={`flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-colors hover:bg-richblack-900 ${
                      videoBarActive === topic._id
                        ? "bg-yellow-900 text-yellow-50"
                        : "text-richblack-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic._id)}
                      onChange={() => {}}
                      className="h-3.5 w-3.5 accent-yellow-50"
                    />
                    <span className="leading-snug">{topic.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}