import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendOtp } from "../../services/operations/authAPI"
import { setSignupData } from "../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../utils/constants"

export default function SignupForm() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const [showPass, setShowPass]         = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false)

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    password: "", confirmPassword: "",
  })

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    dispatch(setSignupData({ ...formData, accountType }))
    dispatch(sendOtp(email, navigate))
  }

  return (
    <div className="mt-6 flex w-full flex-col gap-y-4">

      {/* Account type toggle — Student / Instructor / Admin */}
      <div className="flex rounded-full bg-richblack-800 p-1 gap-x-1 w-max">
        {[ACCOUNT_TYPE.STUDENT, ACCOUNT_TYPE.INSTRUCTOR].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setAccountType(type)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              accountType === type
                ? "bg-richblack-900 text-richblack-5"
                : "text-richblack-200 hover:text-richblack-5"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

        {/* Name row */}
        <div className="flex gap-x-4">
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border border-richblack-700 outline-none focus:border-yellow-50 transition-all"
            />
          </label>
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border border-richblack-700 outline-none focus:border-yellow-50 transition-all"
            />
          </label>
        </div>

        {/* Email */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] text-richblack-5">
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

        {/* Password row */}
        <div className="flex gap-x-4">
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] text-richblack-5">
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
              onClick={() => setShowPass((p) => !p)}
              className="absolute right-3 top-[38px] cursor-pointer text-richblack-300 hover:text-richblack-5 transition-colors"
            >
              {showPass ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
            </span>
          </label>

          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 border border-richblack-700 outline-none focus:border-yellow-50 transition-all"
            />
            <span
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute right-3 top-[38px] cursor-pointer text-richblack-300 hover:text-richblack-5 transition-colors"
            >
              {showConfirm ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 hover:bg-yellow-25 transition-all"
        >
          Create Account
        </button>

      </form>
    </div>
  )
}
