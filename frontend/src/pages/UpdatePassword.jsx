// src/pages/UpdatePassword.jsx

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { resetPassword } from "../services/operations/authAPI"
import Spinner from "../components/common/Spinner"

export default function UpdatePassword() {
  const { id }      = useParams()
  const dispatch    = useDispatch()
  const navigate    = useNavigate()
  const { loading } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    password:        "",
    confirmPassword: "",
  })
  const [showPassword,        setShowPassword]        = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  function handleOnChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  function handleOnSubmit(e) {
    e.preventDefault()
    dispatch(resetPassword(password, confirmPassword, id, navigate))
  }

  if (loading) return <Spinner />

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="max-w-[500px] p-4 lg:p-8">

        {/* Heading */}
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem]
                       text-richblack-5">
          Choose new password
        </h1>

        {/* Subtitle */}
        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-300">
          Almost done. Enter your new password and you are all set.
        </p>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="space-y-6">

          {/* New Password */}
          <div className="relative flex flex-col space-y-2">
            <label
              className="text-sm text-richblack-5"
              htmlFor="password"
            >
              New Password <sup className="text-pink-200">*</sup>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={password}
              onChange={handleOnChange}
              placeholder="Enter new password"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-3 pr-10
                         text-richblack-5 outline-none border border-richblack-700
                         placeholder:text-richblack-400"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer
                         text-richblack-300"
            >
              {showPassword
                ? <AiOutlineEyeInvisible fontSize={24} />
                : <AiOutlineEye fontSize={24} />}
            </span>
          </div>

          {/* Confirm New Password */}
          <div className="relative flex flex-col space-y-2">
            <label
              className="text-sm text-richblack-5"
              htmlFor="confirmPassword"
            >
              Confirm New Password <sup className="text-pink-200">*</sup>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm new password"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-3 pr-10
                         text-richblack-5 outline-none border border-richblack-700
                         placeholder:text-richblack-400"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer
                         text-richblack-300"
            >
              {showConfirmPassword
                ? <AiOutlineEyeInvisible fontSize={24} />
                : <AiOutlineEye fontSize={24} />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-[8px] bg-yellow-50 py-3 px-6
                       font-medium text-richblack-900"
          >
            Reset Password
          </button>

        </form>

        {/* Back to Login */}
        <div className="mt-6">
          <Link to="/login">
            <p className="flex items-center gap-x-2 text-richblack-5">
              <BiArrowBack /> Back to Login
            </p>
          </Link>
        </div>

      </div>
    </div>
  )
}