// src/components/core/Dashboard/Settings/EditProfile.jsx

import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../../services/operations/profileAPI"

const genderOptions = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user }  = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const dispatch  = useDispatch()
  const navigate  = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName:     user?.firstName,
      lastName:      user?.lastName,
      dateOfBirth:   user?.additionalDetails?.dateOfBirth,
      gender:        user?.additionalDetails?.gender,
      contactNumber: user?.additionalDetails?.contactNumber,
      about:         user?.additionalDetails?.about,
    },
  })

  async function onSubmit(data) {
    dispatch(updateProfile(token, data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border border-richblack-700
                      bg-richblack-800 p-8 px-12">

        {/* Section heading */}
        <h2 className="text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>

        {/* Row 1 — First Name + Last Name */}
        <div className="flex flex-col gap-5 sm:flex-row">
          {/* First Name */}
          <div className="flex flex-col gap-2 sm:w-[48%]">
            <label className="text-sm text-richblack-5" htmlFor="firstName">
              First Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              className="form-input rounded-[0.5rem] bg-richblack-700 p-[12px]
                         text-richblack-5 outline-none"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <span className="text-xs text-pink-200">
                {errors.firstName.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2 sm:w-[48%]">
            <label className="text-sm text-richblack-5" htmlFor="lastName">
              Last Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              className="form-input rounded-[0.5rem] bg-richblack-700 p-[12px]
                         text-richblack-5 outline-none"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <span className="text-xs text-pink-200">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        {/* Row 2 — DOB + Gender */}
        <div className="flex flex-col gap-5 sm:flex-row">
          {/* Date of Birth */}
          <div className="flex flex-col gap-2 sm:w-[48%]">
            <label className="text-sm text-richblack-5" htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              className="form-input rounded-[0.5rem] bg-richblack-700 p-[12px]
                         text-richblack-5 outline-none"
              {...register("dateOfBirth", {
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of birth cannot be in the future",
                },
              })}
            />
            {errors.dateOfBirth && (
              <span className="text-xs text-pink-200">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-2 sm:w-[48%]">
            <label className="text-sm text-richblack-5" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              className="form-select rounded-[0.5rem] bg-richblack-700 p-[12px]
                         text-richblack-5 outline-none"
              {...register("gender")}
            >
              {genderOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3 — Contact Number + About */}
        <div className="flex flex-col gap-5 sm:flex-row">
          {/* Contact Number */}
          <div className="flex flex-col gap-2 sm:w-[48%]">
            <label className="text-sm text-richblack-5" htmlFor="contactNumber">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              placeholder="Enter contact number"
              className="form-input rounded-[0.5rem] bg-richblack-700 p-[12px]
                         text-richblack-5 outline-none"
              {...register("contactNumber", {
                maxLength: { value: 12, message: "Invalid contact number" },
                minLength: { value: 10, message: "Invalid contact number" },
              })}
            />
            {errors.contactNumber && (
              <span className="text-xs text-pink-200">
                {errors.contactNumber.message}
              </span>
            )}
          </div>

          {/* About */}
          <div className="flex flex-col gap-2 sm:w-[48%]">
            <label className="text-sm text-richblack-5" htmlFor="about">
              About
            </label>
            <input
              type="text"
              id="about"
              placeholder="Enter bio details"
              className="form-input rounded-[0.5rem] bg-richblack-700 p-[12px]
                         text-richblack-5 outline-none"
              {...register("about")}
            />
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-x-4">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5
                     font-semibold text-richblack-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-yellow-50 py-2 px-5
                     font-semibold text-richblack-900"
        >
          Save
        </button>
      </div>
    </form>
  )
}