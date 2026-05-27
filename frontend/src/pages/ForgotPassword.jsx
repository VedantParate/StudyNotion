// src/pages/ForgotPassword.jsx

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"
import { getPasswordResetToken } from "../services/operations/authAPI"
import Spinner from "../components/common/Spinner"

export default function ForgotPassword() {
  const [email,     setEmail]     = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const { loading } = useSelector((state) => state.auth)
  const dispatch    = useDispatch()

  function handleOnSubmit(e) {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  if (loading) return <Spinner />

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="max-w-[500px] p-4 lg:p-8">

        {/* Heading */}
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem]
                       text-richblack-5">
          {emailSent ? "Check your email" : "Reset your password"}
        </h1>

        {/* Subtitle */}
        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-300">
          {emailSent
            ? `We have sent the reset email to ${email}. Check your inbox and
               follow the instructions.`
            : "Enter the email address associated with your account and we will send you a link to reset your password."}
        </p>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="space-y-4">
          {!emailSent && (
            <div className="flex flex-col space-y-2">
              <label
                className="text-sm text-richblack-5"
                htmlFor="email"
              >
                Email Address <sup className="text-pink-200">*</sup>
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-[0.5rem] bg-richblack-800 p-3
                           text-richblack-5 outline-none border border-richblack-700
                           placeholder:text-richblack-400"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-[8px] bg-yellow-50 py-3 px-6
                       font-medium text-richblack-900"
          >
            {emailSent ? "Resend Email" : "Send Reset Link"}
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