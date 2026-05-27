// src/components/core/Course/CourseAccordionBar.jsx

import { useEffect, useRef, useState } from "react"
import { AiOutlineDown }               from "react-icons/ai"
import { HiOutlineVideoCamera }        from "react-icons/hi"
import { MdOutlineArticle }            from "react-icons/md"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)
  const [active,  setActive]  = useState(false)
  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive, course._id])

  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="overflow-hidden rounded-lg border border-solid
                    border-richblack-600 bg-richblack-900 text-richblack-5
                    last:mb-0">

      {/* Header */}
      <div
        className="flex cursor-pointer items-center justify-between
                   bg-opacity-20 px-7 py-6 transition-[0.3s]"
        onClick={() => handleActive(course._id)}
      >
        {/* Left — Section name + lecture count */}
        <div className="flex items-center gap-2">
          <AiOutlineDown
            className={`text-richblack-50 transition-transform ${
              active ? "rotate-180" : ""
            }`}
          />
          <p className="font-semibold">{course?.sectionName}</p>
        </div>

        {/* Right — Lecture count */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-yellow-25">
            {course?.subSection?.length || 0}{" "}
            {course?.subSection?.length === 1 ? "lecture" : "lectures"}
          </span>
        </div>
      </div>

      {/* Expandable Content */}
      <div
        ref={contentEl}
        className="h-0 overflow-hidden bg-richblack-900 transition-[height]
                   duration-[0.35s] ease-[ease]"
        style={{ height: sectionHeight }}
      >
        <div className="flex flex-col gap-2 px-7 py-6 font-semibold">
          {course?.subSection?.map((subSec) => (
            <div key={subSec?._id} className="flex items-center gap-3">
              <HiOutlineVideoCamera />
              <p>{subSec?.title}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}