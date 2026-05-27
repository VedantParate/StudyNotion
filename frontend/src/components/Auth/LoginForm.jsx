// frontend/src/components/Auth/LoginForm.jsx

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useGoogleLogin } from "@react-oauth/google"
import { apiConnector } from "../../services/apiConnector"
import { endpoints } from "../../services/apis"
import { setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import toast from "react-hot-toast"

export default function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { email, password } = formData

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const toastId = toast.loading("Logging in...")
    setLoading(true)
    try {
      const response = await apiConnector("POST", endpoints.LOGIN_API, {
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
      navigate("/dashboard/my-profile")
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }

  // ✅ Google Login handler
  const handleGoogleSuccess = async (tokenResponse) => {
    const toastId = toast.loading("Signing in with Google...")
    setGoogleLoading(true)
    try {
      // Get user info from Google using the access token
      const googleUser = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      ).then((res) => res.json())

      // Send to your backend
      const response = await apiConnector(
        "POST",
        endpoints.GOOGLE_LOGIN_API,
        {
          email:      googleUser.email,
          firstName:  googleUser.given_name,
          lastName:   googleUser.family_name,
          image:      googleUser.picture,
          googleId:   googleUser.sub,
        }
      )

      if (!response.data.success) throw new Error(response.data.message)

      toast.success("Signed in with Google!")
      dispatch(setToken(response.data.token))
      dispatch(setUser({ ...response.data.user, image: response.data.user?.image || googleUser.picture }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.error("Google login error:", error)
      toast.error("Google sign-in failed. Please try again.")
    } finally {
      setGoogleLoading(false)
      toast.dismiss(toastId)
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError:   () => toast.error("Google sign-in was cancelled or failed."),
  })

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex w-full flex-col gap-y-4">

      {/* Email */}
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter email address"
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border border-richblack-700 outline-none focus:border-yellow-50 transition-all"
        />
      </label>

      {/* Password */}
      <label className="relative w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPass ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter password"
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 border border-richblack-700 outline-none focus:border-yellow-50 transition-all"
        />
        <span
          onClick={() => setShowPass((prev) => !prev)}
          className="absolute right-3 top-[38px] cursor-pointer text-richblack-300 hover:text-richblack-5 transition-colors"
        >
          {showPass ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 text-right text-xs text-blue-100 hover:underline">
            Forgot Password?
          </p>
        </Link>
      </label>

      {/* Sign In button */}
      <button
        type="submit"
        disabled={loading}
        className="mt-4 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 hover:bg-yellow-25 disabled:opacity-60 transition-all"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-x-2">
        <div className="h-[1px] w-full bg-richblack-700" />
        <p className="text-richblack-400 text-sm font-medium">OR</p>
        <div className="h-[1px] w-full bg-richblack-700" />
      </div>

      {/* ✅ Google Sign In Button */}
      <button
        type="button"
        disabled={googleLoading}
        onClick={() => googleLogin()}
        className="flex w-full items-center justify-center gap-x-3 rounded-[8px] border border-richblack-700 bg-richblack-800 py-[8px] px-[12px] font-medium text-richblack-100 hover:bg-richblack-700 disabled:opacity-60 transition-all"
      >
        <svg width="20" height="20" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
        {googleLoading ? "Signing in..." : "Sign in with Google"}
      </button>

    </form>
  )
}