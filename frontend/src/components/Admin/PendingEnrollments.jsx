import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { apiConnector } from "../../services/apiConnector"
import { adminEndpoints } from "../../services/apis"
import toast from "react-hot-toast"

export default function PendingEnrollments() {
  const { token } = useSelector((state) => state.auth)
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPending = async () => {
    try {
      const res = await apiConnector("GET", adminEndpoints.GET_PENDING_PAYMENTS_API,
        null, { Authorization: `Bearer ${token}` })
      setPayments(res.data.data)
    } catch { toast.error("Could not fetch payments") }
    setLoading(false)
  }

  useEffect(() => { fetchPending() }, [])

  const handleVerify = async (paymentId) => {
    try {
      await apiConnector("POST", adminEndpoints.VERIFY_UPI_PAYMENT_API,
        { paymentId }, { Authorization: `Bearer ${token}` })
      toast.success("Payment verified!")
      setPayments((prev) => prev.filter((p) => p._id !== paymentId))
    } catch { toast.error("Verification failed") }
  }

  const handleReject = async (paymentId) => {
    try {
      await apiConnector("POST", adminEndpoints.REJECT_UPI_PAYMENT_API,
        { paymentId }, { Authorization: `Bearer ${token}` })
      toast.success("Payment rejected")
      setPayments((prev) => prev.filter((p) => p._id !== paymentId))
    } catch { toast.error("Rejection failed") }
  }

  if (loading) return <p className="text-richblack-400">Loading...</p>

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-richblack-5">
        Pending Payments
        <span className="ml-2 text-base font-normal text-richblack-400">
          ({payments.length})
        </span>
      </h2>

      {payments.length === 0 ? (
        <p className="py-20 text-center text-richblack-400">
          No pending payments 🎉
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-richblack-700">
          <table className="w-full text-sm">
            <thead className="bg-richblack-700 text-richblack-100">
              <tr>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Course</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Transaction ID</th>
                <th className="px-4 py-3 text-left">Submitted</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-richblack-700">
              {payments.map((p) => (
                <tr key={p._id} className="bg-richblack-800 hover:bg-richblack-700 transition-colors">
                  <td className="px-4 py-3 text-richblack-5">
                    {p.student?.firstName} {p.student?.lastName}
                    <p className="text-xs text-richblack-400">{p.student?.email}</p>
                  </td>
                  <td className="px-4 py-3 text-richblack-300 max-w-[160px] truncate">
                    {p.course?.courseName}
                  </td>
                  <td className="px-4 py-3 font-semibold text-yellow-50">
                    ₹{p.amount}
                  </td>
                  <td className="px-4 py-3 font-mono text-richblack-200">
                    {p.transactionId}
                  </td>
                  <td className="px-4 py-3 text-richblack-400 text-xs">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVerify(p._id)}
                        className="rounded-lg bg-green-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600 transition-all"
                      >
                        Verify ✓
                      </button>
                      <button
                        onClick={() => handleReject(p._id)}
                        className="rounded-lg bg-pink-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-pink-700 transition-all"
                      >
                        Reject ✗
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}