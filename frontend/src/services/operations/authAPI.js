import { toast } from "react-hot-toast"
import { setLoading, setSignupData, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

// ─── Send OTP ─────────────────────────────────────────────────────────────────

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      if (!response.data.success) throw new Error(response.data.message)
      toast.success("OTP sent successfully")
      navigate("/verify-email")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send OTP")
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

// ─── Sign Up ──────────────────────────────────────────────────────────────────

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Creating Account...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })
      if (!response.data.success) throw new Error(response.data.message)
      toast.success("Account created! Please log in.")
      dispatch(setSignupData(null))
      navigate("/login")
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed")
      navigate("/signup")
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

// ─── Login ────────────────────────────────────────────────────────────────────

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })
      if (!response.data.success) throw new Error(response.data.message)

      toast.success("Login successful")
      dispatch(setToken(response.data.token))

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

      dispatch(setUser({ ...response.data.user, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))

      const accountType = response.data.user?.accountType

      if (accountType === "Instructor") {
        navigate("/dashboard/instructor")
      } else if (accountType === "Admin") {
        navigate("/admin")
      } else {
        navigate("/")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged out successfully")
    navigate("/")
  }
}

// ─── Reset Password Token ─────────────────────────────────────────────────────

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending reset email...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email })
      if (!response.data.success) throw new Error(response.data.message)
      toast.success("Reset email sent successfully")
      setEmailSent(true)
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send reset email")
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

// ─── Reset Password ───────────────────────────────────────────────────────────

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Resetting password...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })
      if (!response.data.success) throw new Error(response.data.message)
      toast.success("Password reset successfully")
      navigate("/login")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not reset password")
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}