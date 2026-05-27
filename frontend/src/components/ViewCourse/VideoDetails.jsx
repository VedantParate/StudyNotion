// frontend/src/components/ViewCourse/VideoDetails.jsx

import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { updateCompletedLectures } from "../../slices/viewCourseSlice"
import { markLectureAsComplete } from "../../services/operations/courseDetailsAPI"
import DownloadCertificate from "../Certificate/DownloadCertificate"  // ← ADD THIS

export default function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate  = useNavigate()
  const dispatch  = useDispatch()
  const videoRef  = useRef(null)
  const { token } = useSelector((state) => state.auth)
  const { user }  = useSelector((state) => state.profile)  // ← ADD THIS
  const { courseSectionData, courseEntireData, completedLectures, totalNoOfLectures } = useSelector(
    (state) => state.viewCourse
  )

  const [videoData,  setVideoData]  = useState(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [videoError, setVideoError] = useState(null)

  // ✅ ADD THIS — check if course is 100% complete
  const isCourseComplete = completedLectures.length === totalNoOfLectures && totalNoOfLectures > 0

  const allLectures = courseSectionData.flatMap((sec) =>
    sec.subSection.map((sub) => ({ sectionId: sec._id, subSectionId: sub._id }))
  )
  const currentIndex = allLectures.findIndex((l) => l.subSectionId === subSectionId)
  const isFirst      = currentIndex === 0
  const isLast       = currentIndex === allLectures.length - 1
  const isCompleted  = completedLectures.includes(subSectionId)

  const goTo = (index) => {
    const t = allLectures[index]
    if (!t) return
    setVideoEnded(false)
    setVideoError(null)
    navigate(`/view-course/${courseId}/section/${t.sectionId}/sub-section/${t.subSectionId}`)
  }

  useEffect(() => {
    if (!courseSectionData.length) return
    const section    = courseSectionData.find((s) => s._id === sectionId)
    const subSection = section?.subSection.find((s) => s._id === subSectionId)
    if (subSection) {
      setVideoData(subSection)
      setVideoEnded(false)
      setVideoError(null)
    }
  }, [courseSectionData, subSectionId, sectionId])

  useEffect(() => {
    if (videoRef.current && videoData?.videoUrl) {
      videoRef.current.load()
    }
  }, [videoData?.videoUrl])

  const handleCompletion = async () => {
    setLoading(true)
    if (!isCompleted) {
      await markLectureAsComplete({ courseId, subSectionId }, token)
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-5 p-4 max-w-5xl mx-auto">

      {/* ── Video player ── */}
      <div className="relative w-full overflow-hidden rounded-xl bg-black shadow-lg"
           style={{ aspectRatio: "16/9" }}>

        {!videoData ? (
          <div className="flex h-full items-center justify-center text-richblack-400">
            Loading...
          </div>

        ) : !videoData.videoUrl ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-8 text-center">
            <p className="text-yellow-400 font-semibold">⚠️ No video URL stored</p>
            <p className="text-richblack-400 text-sm">
              Re-upload this lecture video from the Instructor dashboard.
            </p>
          </div>

        ) : videoError ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-8 text-center">
            <p className="text-red-400 font-semibold">⚠️ Video failed to load</p>
            <p className="text-richblack-400 text-sm break-all">{videoData.videoUrl}</p>
          </div>

        ) : (
          <video
            ref={videoRef}
            key={videoData.videoUrl}
            controls
            className="h-full w-full"
            onEnded={() => { handleCompletion(); setVideoEnded(true) }}
            onError={() => setVideoError(true)}
          >
            <source src={videoData.videoUrl} />
            Your browser does not support HTML5 video.
          </video>
        )}

        {/* End-of-video overlay */}
        {videoEnded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4
                          bg-richblack-900/80 backdrop-blur-sm">
            {!isCompleted && (
              <button disabled={loading} onClick={handleCompletion}
                className="rounded-md bg-yellow-50 px-6 py-2 font-semibold text-richblack-900
                           hover:bg-yellow-25 disabled:opacity-60 transition-all">
                {loading ? "Saving..." : "Mark as Completed"}
              </button>
            )}
            <button onClick={() => { setVideoEnded(false); videoRef.current?.play() }}
              className="rounded-md border border-richblack-300 px-6 py-2 font-semibold
                         text-richblack-300 hover:bg-richblack-700 transition-all">
              Rewatch
            </button>
            {!isLast && (
              <button onClick={() => goTo(currentIndex + 1)}
                className="rounded-md bg-richblack-600 px-6 py-2 font-semibold text-white
                           hover:bg-richblack-500 transition-all">
                Next Lecture →
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Prev / Mark Complete / Next ── */}
      <div className="flex items-center justify-between">
        <button disabled={isFirst} onClick={() => goTo(currentIndex - 1)}
          className="rounded-md border border-richblack-600 px-5 py-2 text-sm font-semibold
                     text-richblack-300 hover:bg-richblack-700 disabled:cursor-not-allowed
                     disabled:opacity-40 transition-all">
          ← Previous
        </button>

        {!isCompleted && !videoEnded && (
          <button disabled={loading} onClick={handleCompletion}
            className="rounded-md bg-yellow-50 px-5 py-2 text-sm font-semibold
                       text-richblack-900 hover:bg-yellow-25 disabled:opacity-60 transition-all">
            {loading ? "Saving..." : "Mark as Completed"}
          </button>
        )}

        <button disabled={isLast} onClick={() => goTo(currentIndex + 1)}
          className="rounded-md border border-richblack-600 px-5 py-2 text-sm font-semibold
                     text-richblack-300 hover:bg-richblack-700 disabled:cursor-not-allowed
                     disabled:opacity-40 transition-all">
          Next →
        </button>
      </div>

      {/* ── Title + description ── */}
      {videoData && (
        <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
          <h1 className="text-2xl font-semibold text-richblack-5">{videoData.title}</h1>
          {videoData.description && (
            <p className="mt-3 text-sm leading-relaxed text-richblack-300">
              {videoData.description}
            </p>
          )}
        </div>
      )}

      {/* ✅ CERTIFICATE SECTION — shows only when all lectures are done */}
      {isCourseComplete && (
        <div className="rounded-xl border border-yellow-400 bg-richblack-800 p-6 flex flex-col items-center gap-3">
          <p className="text-2xl font-bold text-yellow-400">🎉 Congratulations!</p>
          <p className="text-richblack-300 text-sm text-center">
            You have successfully completed <span className="text-white font-semibold">{courseEntireData?.courseName}</span>.
            Download your certificate below.
          </p>
          <DownloadCertificate
            studentName={`${user?.firstName} ${user?.lastName}`}
            courseName={courseEntireData?.courseName}
          />
        </div>
      )}

    </div>
  )
}