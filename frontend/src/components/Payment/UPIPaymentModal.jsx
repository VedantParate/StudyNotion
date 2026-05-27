// frontend/src/components/Payment/UPIPaymentModal.jsx
//
// Props — two modes:
//   Single course (CourseDetailsCard):  course={course}  setModal={fn}
//   Cart checkout (Cart):               courses={[...]}  amount={total}  setModal={fn}

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RxCross2 } from "react-icons/rx"
import { apiConnector } from "../../services/apiConnector"
import { studentEndpoints } from "../../services/apis"
import { clearCart } from "../../slices/cartSlice"
import toast from "react-hot-toast"

export default function UPIPaymentModal({ course, courses, amount, setModal }) {
  const { token } = useSelector((state) => state.auth)
  const navigate  = useNavigate()
  const dispatch  = useDispatch()

  const [transactionId, setTransactionId] = useState("")
  const [loading, setLoading]             = useState(false)
  const [step, setStep]                   = useState(1)

  // Normalise to array — works for both single course and cart
  const isCartMode  = Boolean(courses && courses.length > 0)
  const courseList  = isCartMode ? courses : [course]
  const payAmount   = isCartMode ? amount  : course?.price
  const displayName = isCartMode ? `${courseList.length} courses` : course?.courseName

  const UPI_ID   = import.meta.env.VITE_APP_UPI_ID
  const UPI_NAME = import.meta.env.VITE_APP_UPI_NAME

  const upiURL = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${payAmount}&cu=INR&tn=${encodeURIComponent(`Payment for ${displayName}`)}`

  const handleSubmit = async () => {
    if (!transactionId.trim()) {
      toast.error("Please enter your transaction ID")
      return
    }
    setLoading(true)
    const toastId = toast.loading("Verifying payment...")

    try {
      const response = await apiConnector(
        "POST",
        studentEndpoints.UPI_PAYMENT_SUBMIT_API,
        {
          courses:       courseList.map((c) => c._id),
          transactionId: transactionId.trim(),
        },
        { Authorization: `Bearer ${token}` }
      )

      if (!response.data.success) throw new Error(response.data.message)

      toast.success("Enrolled successfully! Happy learning 🎉")
      if (isCartMode) dispatch(clearCart())
      setModal(false)
      navigate("/dashboard/enrolled-courses")
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment submission failed")
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-richblack-700 bg-richblack-800 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-richblack-700 px-6 py-4">
          <p className="text-lg font-semibold text-richblack-5">Complete Payment</p>
          <button onClick={() => setModal(false)}>
            <RxCross2 className="text-2xl text-richblack-300 hover:text-white transition-colors" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">

          {/* Course / Cart summary */}
          <div className="mb-6 rounded-xl bg-richblack-700 p-4">
            {isCartMode ? (
              <div className="flex flex-col gap-2">
                {courseList.map((c) => (
                  <div key={c._id} className="flex items-center gap-3">
                    <img src={c.thumbnail} alt={c.courseName}
                      className="h-10 w-14 rounded-lg object-cover flex-shrink-0" />
                    <p className="flex-1 text-sm font-medium text-richblack-5 line-clamp-1">
                      {c.courseName}
                    </p>
                    <p className="text-sm font-bold text-yellow-50">₹{c.price}</p>
                  </div>
                ))}
                <div className="mt-2 border-t border-richblack-600 pt-2 flex justify-between">
                  <span className="text-sm text-richblack-300">Total</span>
                  <span className="text-lg font-bold text-yellow-50">₹{payAmount}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <img src={course?.thumbnail} alt={course?.courseName}
                  className="h-14 w-20 rounded-lg object-cover" />
                <div>
                  <p className="font-semibold text-richblack-5 leading-snug line-clamp-2">
                    {course?.courseName}
                  </p>
                  <p className="mt-1 text-xl font-bold text-yellow-50">₹{payAmount}</p>
                </div>
              </div>
            )}
          </div>

          {/* Step tabs */}
          <div className="mb-6 flex rounded-lg bg-richblack-700 p-1">
            {["Scan & Pay", "Enter Transaction ID"].map((label, i) => (
              <button key={i} onClick={() => setStep(i + 1)}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  step === i + 1
                    ? "bg-yellow-50 text-richblack-900"
                    : "text-richblack-300 hover:text-richblack-50"
                }`}>
                {i + 1}. {label}
              </button>
            ))}
          </div>

          {/* Step 1 — QR Code */}
          {step === 1 && (
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-2xl bg-white p-4 shadow-lg">
                <QRCodeSVG value={upiURL} size={200} level="H" includeMargin={false} />
              </div>
              <div className="text-center">
                <p className="text-sm text-richblack-300">Scan with any UPI app</p>
                <div className="mt-2 flex justify-center gap-3 text-sm text-richblack-200">
                  <span>GPay</span><span>PhonePe</span><span>Paytm</span>
                </div>
              </div>
              <div className="w-full rounded-xl bg-richblack-700 px-4 py-3 text-center">
                <p className="text-xs text-richblack-400">UPI ID</p>
                <p className="font-semibold text-yellow-50">{UPI_ID}</p>
              </div>
              <button onClick={() => setStep(2)}
                className="w-full rounded-lg bg-yellow-50 py-2.5 text-sm font-semibold text-richblack-900 hover:bg-yellow-25 transition-all">
                I've Paid → Enter Transaction ID
              </button>
            </div>
          )}

          {/* Step 2 — Transaction ID */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div className="rounded-xl bg-richblack-700 p-4 text-sm text-richblack-300">
                <p className="font-medium text-richblack-100 mb-1">How to find your Transaction ID:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Open your UPI app after payment</li>
                  <li>Go to transaction history</li>
                  <li>Copy the UPI Transaction ID / UTR number</li>
                </ul>
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-richblack-200">
                  Transaction ID / UTR Number <span className="text-pink-200">*</span>
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g. 123456789012"
                  className="w-full rounded-lg bg-richblack-700 px-4 py-3 text-sm text-richblack-5 placeholder:text-richblack-400 outline-none focus:ring-1 focus:ring-yellow-50"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)}
                  className="flex-1 rounded-lg border border-richblack-600 py-2.5 text-sm font-semibold text-richblack-300 hover:bg-richblack-700 transition-all">
                  ← Back
                </button>
                <button onClick={handleSubmit}
                  disabled={loading || !transactionId.trim()}
                  className="flex-1 rounded-lg bg-yellow-50 py-2.5 text-sm font-semibold text-richblack-900 hover:bg-yellow-25 disabled:opacity-60 transition-all">
                  {loading ? "Processing..." : "Complete Enrollment"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
