// src/components/core/Dashboard/Cart/RenderTotalAmount.jsx

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token }       = useSelector((state) => state.auth)
  const { user }        = useSelector((state) => state.profile)
  const dispatch        = useDispatch()
  const navigate        = useNavigate()

  function handleBuyCourse() {
    const courses = cart.map((c) => c._id)
    buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-md border border-richblack-700
                    bg-richblack-800 p-6">

      {/* Total Label */}
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>

      {/* Total Amount */}
      <p className="mb-6 text-3xl font-medium text-yellow-50">
        ₹ {total}
      </p>

      {/* Buy Button */}
      <button
        onClick={handleBuyCourse}
        className="w-full cursor-pointer rounded-md bg-yellow-50 py-3
                   px-6 font-semibold text-richblack-900"
      >
        Buy Now
      </button>
    </div>
  )
}