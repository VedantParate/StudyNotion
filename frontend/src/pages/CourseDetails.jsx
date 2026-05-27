// src/pages/CourseDetails.jsx

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { BsFillCaretRightFill } from "react-icons/bs"

// FIX: react-rating-stars-component is a CommonJS module. Vite's ESM wrapper
// exports the entire CJS module object as its default, so a plain default import
// gives you { default: <fn> } — an object, not a callable component.
// Unwrap it with the ?. / ?? guard so this works whether Vite returns the
// component directly or wraps it in .default.
import ReactStarsModule from "react-rating-stars-component"
const ReactStars = ReactStarsModule?.default ?? ReactStarsModule

import { getCourseDetails }  from "../services/operations/courseDetailsAPI"
import CourseDetailsCard     from "../components/core/Course/CourseDetailsCard"
import ConfirmationModal     from "../components/common/ConfirmationModal"
import Spinner               from "../components/common/Spinner"
import Footer                from "../components/common/Footer"

export default function CourseDetails() {
  const { courseId }  = useParams()
  const navigate      = useNavigate()
  const { token }     = useSelector((state) => state.auth)
  const { user }      = useSelector((state) => state.profile)

  const [course,             setCourse]             = useState(null)
  const [loading,            setLoading]            = useState(false)
  const [confirmationModal,  setConfirmationModal]  = useState(null)
  const [accordionOpen,      setAccordionOpen]      = useState({})

  useEffect(() => {
    async function fetchCourse() {
      setLoading(true)
      const result = await getCourseDetails(courseId)
      if (result) setCourse(result)
      setLoading(false)
    }
    fetchCourse()
  }, [courseId])

  function toggleAccordion(sectionId) {
    setAccordionOpen((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  if (loading) return <Spinner />
  if (!course)  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-richblack-5">
      <p>Course not found.</p>
    </div>
  )

  const {
    courseName, courseDescription, whatYouWillLearn,
    courseContent = [], ratingAndReviews = [], instructor,
    studentsEnrolled = [], tag = [], instructions = [],
  } = course

  const avgRating = ratingAndReviews.length
    ? (ratingAndReviews.reduce((sum, r) => sum + r.rating, 0) / ratingAndReviews.length).toFixed(1)
    : 0

  const totalLectures = courseContent.reduce((sum, sec) => sum + (sec.subSection?.length ?? 0), 0)

  return (
    <div className="text-richblack-5">

      {/* Hero Banner */}
      <div className="relative bg-richblack-800">
        <div className="mx-auto box-content max-w-[1260px] px-4 py-8 lg:flex lg:gap-8">

          {/* Left: course info */}
          <div className="flex flex-col gap-4 lg:max-w-[calc(100%-400px)]">
            {tag[0] && <p className="text-sm text-yellow-25">{tag[0]}</p>}
            <h1 className="text-3xl font-bold text-richblack-5 sm:text-4xl">{courseName}</h1>
            <p className="text-richblack-200">{courseDescription}</p>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-bold text-yellow-25">{avgRating}</span>
              <ReactStars count={5} value={Number(avgRating)} size={20} edit={false} activeColor="#ffd700" color2="#ffd700" />
              <span className="text-richblack-400">({ratingAndReviews.length} ratings) • {studentsEnrolled.length} students</span>
            </div>
            <p className="text-sm">Created by <span className="font-semibold text-richblack-50">{instructor?.firstName} {instructor?.lastName}</span></p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-richblack-200">
              <span className="flex items-center gap-1"><BiInfoCircle /> Last updated recently</span>
              <span className="flex items-center gap-1"><HiOutlineGlobeAlt /> English</span>
            </div>
          </div>

          {/* Right: buy card */}
          <div className="z-10 mt-8 lg:absolute lg:right-[calc((100%-1260px)/2+16px)] lg:top-8 lg:mt-0 lg:w-[380px]">
            <CourseDetailsCard course={course} setConfirmationModal={setConfirmationModal} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto box-content max-w-[1260px] px-4 py-12">
        <div className="lg:max-w-[calc(100%-420px)]">

          {/* What you'll learn */}
          <div className="mb-10 rounded-xl border border-richblack-600 p-6">
            <h2 className="mb-4 text-2xl font-bold">What you'll learn</h2>
            <p className="text-richblack-200">{whatYouWillLearn}</p>
          </div>

          {/* Course content accordion */}
          <div className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">Course Content</h2>
            <p className="mb-4 text-sm text-richblack-200">{courseContent.length} sections • {totalLectures} lectures</p>
            <div className="flex flex-col gap-2">
              {courseContent.map((section) => (
                <div key={section._id} className="overflow-hidden rounded-lg border border-richblack-600">
                  <button onClick={() => toggleAccordion(section._id)}
                    className="flex w-full items-center justify-between bg-richblack-700 px-5 py-4 text-left font-semibold text-richblack-5">
                    <span className="flex items-center gap-2">
                      <BsFillCaretRightFill className={`text-yellow-25 transition-transform duration-200 ${accordionOpen[section._id] ? "rotate-90" : ""}`} />
                      {section.sectionName}
                    </span>
                    <span className="text-sm font-normal text-richblack-300">{section.subSection?.length ?? 0} lectures</span>
                  </button>
                  {accordionOpen[section._id] && (
                    <div className="bg-richblack-900">
                      {section.subSection?.map((sub) => (
                        <div key={sub._id} className="flex items-center gap-3 border-t border-richblack-700 px-5 py-3 text-sm text-richblack-200">
                          <BsFillCaretRightFill className="text-xs text-richblack-400" />
                          <span>{sub.title}</span>
                          {sub.timeDuration && <span className="ml-auto text-richblack-400">{sub.timeDuration}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          {instructions.length > 0 && (
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold">Requirements</h2>
              <ul className="flex flex-col gap-2">
                {instructions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-richblack-200">
                    <BsFillCaretRightFill className="mt-1 text-xs text-yellow-25" />{item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructor */}
          <div className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">Instructor</h2>
            <div className="flex items-center gap-4">
              <img src={instructor?.image} alt={instructor?.firstName} className="h-14 w-14 rounded-full object-cover" />
              <div>
                <p className="font-semibold">{instructor?.firstName} {instructor?.lastName}</p>
                <p className="text-sm text-richblack-300">{instructor?.additionalDetails?.about ?? "Instructor"}</p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          {ratingAndReviews.length > 0 && (
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold">Student Reviews ({ratingAndReviews.length})</h2>
              <div className="flex flex-col gap-4">
                {ratingAndReviews.slice(0, 4).map((review, i) => (
                  <div key={i} className="rounded-xl border border-richblack-600 p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <img src={review?.user?.image} alt={review?.user?.firstName} className="h-10 w-10 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold">{review?.user?.firstName} {review?.user?.lastName}</p>
                        <ReactStars count={5} value={review.rating} size={14} edit={false} activeColor="#ffd700" color2="#ffd700" />
                      </div>
                    </div>
                    <p className="text-sm text-richblack-200">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      <Footer />
    </div>
  )
}
