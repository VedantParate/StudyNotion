import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { createRating } from "../../services/operations/courseOperationsAPI"
import ReactStars from "react-rating-stars-component"
import { RxCross2 } from "react-icons/rx"

export default function CourseReviewModal({ setReviewModal }) {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { courseId } = useParams()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
  }, [])

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-richblack-700 bg-richblack-800 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-richblack-700 px-6 py-4">
          <p className="text-lg font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-300 hover:text-richblack-50 transition-colors" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* User info */}
          <div className="mb-6 flex items-center gap-4">
            <img
              src={user?.image}
              alt={user?.firstName}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-400">Posting publicly</p>
            </div>
          </div>

          {/* Star rating */}
          <div className="mb-4 flex flex-col items-center gap-1">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={36}
              activeColor="#ffd700"
            />
            {errors.courseRating && (
              <p className="text-xs text-pink-200">Please select a rating</p>
            )}
          </div>

          {/* Review text */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm text-richblack-200">
                Your Experience <span className="text-pink-200">*</span>
              </label>
              <textarea
                {...register("courseExperience", { required: true })}
                placeholder="Share your experience about this course..."
                rows={4}
                className="w-full resize-none rounded-lg bg-richblack-700 p-3 text-sm text-richblack-5 placeholder:text-richblack-400 outline-none focus:ring-1 focus:ring-yellow-50"
              />
              {errors.courseExperience && (
                <p className="mt-1 text-xs text-pink-200">
                  Please share your experience
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="rounded-lg bg-richblack-700 px-5 py-2 text-sm font-semibold text-richblack-200 hover:bg-richblack-600 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-yellow-50 px-5 py-2 text-sm font-semibold text-richblack-900 hover:bg-yellow-25 transition-all"
              >
                Save
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}