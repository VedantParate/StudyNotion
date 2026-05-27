// src/pages/VerifyEmail.jsx

import { useEffect, useState } from "react"
import OtpInput from "react-otp-input"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { BiArrowBack } from "react-icons/bi"
import { RxCountdownTimer } from "react-icons/rx"
import { sendOtp, signUp } from "../services/operations/authAPI"
import Spinner from "../components/common/Spinner"

export default function VerifyEmail() {
  const [otp, setOtp] = useState("")
  const { signupData, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!signupData) navigate("/signup")
  }, [signupData, navigate])

  function handleVerifyAndSignup(e) {
    e.preventDefault()
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    )
  }

  if (loading) return <Spinner />

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      <div className="max-w-[500px] p-4 lg:p-8">

        {/* Heading */}
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          Verify Email
        </h1>

        {/* Subtitle */}
        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
          A verification code has been sent to you. Enter the code below.
        </p>

        {/* OTP Form */}
        <form onSubmit={handleVerifyAndSignup}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800
                           rounded-[0.5rem] text-richblack-5 aspect-square
                           text-center focus:outline-2 focus:outline-yellow-50"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
            }}
          />

          {/* Verify Button */}
          <button
            type="submit"
            disabled={otp.length !== 6}
            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[24px]
                       font-medium text-richblack-900 disabled:opacity-60
                       disabled:cursor-not-allowed"
          >
            Verify Email
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 flex items-center justify-between">

          {/* Back to Signup */}
          <Link to="/signup">
            <p className="flex items-center gap-x-2 text-richblack-5">
              <BiArrowBack /> Back to Signup
            </p>
          </Link>

          {/* Resend OTP */}
          <button
            type="button"
            onClick={() => dispatch(sendOtp(signupData.email, navigate))}
            className="flex items-center gap-x-2 text-blue-100"
          >
            <RxCountdownTimer />
            Resend it
          </button>

        </div>
      </div>
    </div>
  )
}