import { toast } from "react-hot-toast"
import { studentEndpoints } from "../apis"
import { apiConnector } from "../apiConnector"
import { resetCourseState } from "../../slices/courseSlice"
import { clearCart } from "../../slices/cartSlice"

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
  GET_ENROLLED_COURSES_API,
  UPI_PAYMENT_SUBMIT_API,
} = studentEndpoints


// ─── Load Razorpay Script ─────────────────────────────────────────────────────

function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}


// ─── Send Payment Success Email ───────────────────────────────────────────────

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId:   response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` }
    )
  } catch (error) {
    console.error("Payment success email error:", error)
  }
}


// ─── Verify Payment ───────────────────────────────────────────────────────────

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying payment...")
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Payment successful! You are enrolled.")
    navigate("/dashboard/enrolled-courses")
    dispatch(clearCart())
    dispatch(resetCourseState())
  } catch (error) {
    toast.error("Payment verification failed")
  } finally {
    toast.dismiss(toastId)
  }
}


// ─── Buy Course (Razorpay) ────────────────────────────────────────────────────

export async function buyCourse(data, token, courses, userDetails, navigate, dispatch) {
  const toastId = toast.loading("Loading payment gateway...")
  try {
    // Load Razorpay SDK
    const isLoaded = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    )
    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load. Check your connection.")
      return
    }

    // Capture payment — get order details from backend
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    )
    if (!orderResponse.data.success)
      throw new Error(orderResponse.data.message)

    // Razorpay checkout options
    const options = {
      key:      import.meta.env.VITE_APP_RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount:   `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name:     "StudyNotion",
      description: "Thank you for purchasing the course.",
      prefill: {
        name:  `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      handler: async function (response) {
        // Send confirmation email
        await sendPaymentSuccessEmail(
          response,
          orderResponse.data.data.amount,
          token
        )
        // Verify and enroll
        await verifyPayment(
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id:   response.razorpay_order_id,
            razorpay_signature:  response.razorpay_signature,
            courses,
          },
          token,
          navigate,
          dispatch
        )
      },
    }

    // Open Razorpay modal
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    paymentObject.on("payment.failed", (response) => {
      toast.error("Payment failed. Please try again.")
      console.error("Payment failed:", response.error)
    })
  } catch (error) {
    toast.error(error.response?.data?.message || "Could not initiate payment")
  } finally {
    toast.dismiss(toastId)
  }
}


// ─── Submit UPI Payment ───────────────────────────────────────────────────────

export async function submitUPIPayment(data, token) {
  const toastId = toast.loading("Submitting payment...")
  try {
    const response = await apiConnector(
      "POST",
      UPI_PAYMENT_SUBMIT_API,
      data,
      { Authorization: `Bearer ${token}` }
    )
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Payment submitted! Enrollment pending verification.")
    return true
  } catch (error) {
    toast.error(error.message || "Payment submission failed")
    return false
  } finally {
    toast.dismiss(toastId)
  }
}


// ─── Get Enrolled Courses ─────────────────────────────────────────────────────

export async function getEnrolledCourses(token) {
  try {
    const response = await apiConnector(
      "GET",
      GET_ENROLLED_COURSES_API,
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (!response.data.success) throw new Error(response.data.message)
    return response.data.data
  } catch (error) {
    toast.error("Could not fetch enrolled courses")
    return []
  }
}