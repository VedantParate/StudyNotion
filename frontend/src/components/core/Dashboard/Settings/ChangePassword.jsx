// src/components/core/Dashboard/Settings/ChangePassword.jsx

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { changePassword } from "../../../../services/operations/profileAPI"

export default function ChangePassword() {
  const { token }  = useSelector((state) => state.auth)
  const dispatch   = useDispatch()

  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  function onSubmit(data) {
    dispatch(changePassword(token, data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border border-richblack-700
                      bg-richblack-800 p-8 px-12">

        {/* Section heading */}
        <h2 className="text-lg font-semibold text-richblack-5">
          Password
        </h2>

        <div className="flex flex-col gap-5 sm:flex-row">

          {/* Old Password */}
          <div className="relative flex flex-col gap-2 sm:w-[48%]">
            <label className="text-sm text-richblack-5" htmlFor="oldPassword">
              Current Password <sup className="text-pink-200">*</sup>
            </label>
            <input
              type={showOld ? "text" : "password"}
              id="oldPassword"
              placeholder="Enter current password"
              className="form-input rounded-[0.5rem] bg-richblack-700 p-[12px]
                         pr-10 text-richblack-5 outline-none"
              {...register("oldPassword", { required: "Current password is required" })}
            />
            <span
              onClick={() => setShowOld((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer text-richblack-300"
            >
              {showOld
                ? <AiOutlineEyeInvisible fontSize={24} />
                : <AiOutlineEye fontSize={24} />}
            </span>
            {errors.oldPassword && (
              <span className="text-xs text-pink-200">
                {errors.oldPassword.message}
              </span>
            )}
          </div>

          {/* New Password */}
          <div className="relative flex flex-col gap-2 sm:w-[48%]">
            <label className="text-sm text-richblack-5" htmlFor="newPassword">
              New Password <sup className="text-pink-200">*</sup>
            </label>
            <input
              type={showNew ? "text" : "password"}
              id="newPassword"
              placeholder="Enter new password"
              className="form-input rounded-[0.5rem] bg-richblack-700 p-[12px]
                         pr-10 text-richblack-5 outline-none"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <span
              onClick={() => setShowNew((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer text-richblack-300"
            >
              {showNew
                ? <AiOutlineEyeInvisible fontSize={24} />
                : <AiOutlineEye fontSize={24} />}
            </span>
            {errors.newPassword && (
              <span className="text-xs text-pink-200">
                {errors.newPassword.message}
              </span>
            )}
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-x-4">
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-yellow-50 py-2 px-5
                     font-semibold text-richblack-900"
        >
          Update
        </button>
      </div>
    </form>
  )
}