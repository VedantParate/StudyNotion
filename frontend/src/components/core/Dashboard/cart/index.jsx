// frontend/src/components/core/Dashboard/Cart/index.jsx

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { FiTrash2 } from "react-icons/fi"
import { removeFromCart } from "../../../../slices/cartSlice"
import { toast } from "react-hot-toast"
// import UPIPaymentModal from "../../Payment/UPIPaymentModal"
import UPIPaymentModal from "../../../Payment/UPIPaymentModal"

export default function Cart() {
  const dispatch = useDispatch()
  const { cart, totalItems, total } = useSelector((state) => state.cart)

  // FIX: was calling buyCourse() which hits /payment/capturePayment — that
  // Razorpay route is fully commented out on the backend. App uses UPI now.
  // Show UPIPaymentModal with the full cart instead.
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const handleRemove = (courseId) => {
    dispatch(removeFromCart(courseId))
    toast.success("Removed from cart")
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-richblack-5">
        <p className="text-2xl font-semibold text-richblack-100">
          Your cart is empty
        </p>
        <p className="mt-2 text-richblack-400">
          Add courses to get started.
        </p>
        <Link
          to="/catalog"
          className="mt-6 rounded-lg bg-yellow-50 px-6 py-3 font-bold text-richblack-900 hover:bg-yellow-25 transition"
        >
          Browse Courses
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-maxContent px-4 py-10 text-richblack-5">
      <h1 className="mb-8 text-3xl font-semibold">My Cart</h1>
      <p className="mb-6 text-richblack-400">
        {totalItems} course{totalItems > 1 ? "s" : ""} in cart
      </p>

      <div className="flex flex-col gap-6 lg:flex-row">

        {/* ── Course List ── */}
        <div className="flex flex-1 flex-col gap-4">
          {cart.map((course) => (
            <div key={course._id} className="flex gap-4 rounded-xl bg-richblack-800 p-4">
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="h-24 w-36 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="font-semibold text-richblack-5 line-clamp-2">
                    {course.courseName}
                  </p>
                  <p className="mt-1 text-sm text-richblack-400">
                    {course.instructor?.firstName} {course.instructor?.lastName}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(course._id)}
                  className="mt-2 flex w-fit items-center gap-1 text-sm text-pink-200 hover:text-pink-100 transition"
                >
                  <FiTrash2 />
                  Remove
                </button>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-lg font-bold text-yellow-50">₹{course.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order Summary ── */}
        <div className="h-fit w-full rounded-xl bg-richblack-800 p-6 lg:w-80">
          <h2 className="mb-4 text-xl font-semibold text-richblack-5">Order Summary</h2>
          <div className="mb-2 flex justify-between text-richblack-300">
            <span>Price ({totalItems} item{totalItems > 1 ? "s" : ""})</span>
            <span>₹{total}</span>
          </div>
          <div className="my-4 border-t border-richblack-600" />
          <div className="mb-6 flex justify-between text-lg font-bold text-richblack-5">
            <span>Total</span>
            <span className="text-yellow-50">₹{total}</span>
          </div>

          <button
            onClick={() => setShowPaymentModal(true)}
            className="block w-full rounded-lg bg-yellow-50 py-3 text-center font-bold text-richblack-900 hover:bg-yellow-25 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {showPaymentModal && (
        <UPIPaymentModal
          courses={cart}
          amount={total}
          setModal={setShowPaymentModal}
        />
      )}
    </div>
  )
}
