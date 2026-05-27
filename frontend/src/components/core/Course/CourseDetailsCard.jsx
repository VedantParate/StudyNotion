import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import UPIPaymentModal from "../../Payment/UPIPaymentModal"

export default function CourseDetailsCard({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) {
  const { user }  = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const dispatch  = useDispatch()
  const navigate  = useNavigate()

  const [paymentModal, setPaymentModal] = useState(false)

  const {
    thumbnail,
    price,
    _id: courseId,
    studentsEnrolled,
  } = course

  function handleShare() {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard")
  }

  function handleAddToCart() {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot buy courses")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1:       "You are not logged in!",
      text2:       "Please log in to add to cart.",
      btn1Text:    "Login",
      btn2Text:    "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const userAlreadyEnrolled = studentsEnrolled?.includes(user?._id)

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-richblack-700 p-4 text-richblack-5">

      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={course?.courseName}
        className="max-h-[300px] min-h-[180px] w-full rounded-2xl object-cover"
      />

      {/* Price */}
      <p className="text-3xl font-semibold text-richblack-5">
        Rs. {price}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-4">
        {userAlreadyEnrolled ? (
          <button
            onClick={() =>
              navigate(
                `/view-course/${courseId}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
              )
            }
            className="rounded-lg bg-yellow-50 px-6 py-3 font-semibold text-richblack-900"
          >
            Go to Course
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                if (!token) {
                  setConfirmationModal({
                    text1:       "You are not logged in!",
                    text2:       "Please log in to buy this course.",
                    btn1Text:    "Login",
                    btn2Text:    "Cancel",
                    btn1Handler: () => navigate("/login"),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                  return
                }
                if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
                  toast.error("Instructors cannot buy courses")
                  return
                }
                setPaymentModal(true)
              }}
              className="w-full rounded-lg bg-yellow-50 py-3 font-semibold text-richblack-900 hover:bg-yellow-25 transition-all"
            >
              Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              className="rounded-lg bg-richblack-800 px-6 py-3 font-semibold text-richblack-5"
            >
              Add to Cart
            </button>
          </>
        )}
      </div>

      {/* Fine print */}
      <p className="text-center text-xs text-richblack-25">
        30-Day Money-Back Guarantee
      </p>

      {/* What's included */}
      <div className="flex flex-col gap-3 border-t border-richblack-600 pt-4">
        <p className="text-sm font-semibold text-richblack-5">
          This course includes:
        </p>
        {course?.instructions?.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <BsFillCaretRightFill className="mt-1 text-xs text-yellow-50" />
            <p className="text-sm text-caribbeangreen-100">{item}</p>
          </div>
        ))}
      </div>

      {/* Share */}
      <button
        onClick={handleShare}
        className="mx-auto flex items-center gap-2 text-sm font-semibold text-yellow-25"
      >
        <FaShareSquare />
        Share
      </button>

      {/* UPI Payment Modal */}
      {paymentModal && (
        <UPIPaymentModal
          course={course}
          setModal={setPaymentModal}
        />
      )}

    </div>
  )
}