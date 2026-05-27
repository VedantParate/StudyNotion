// src/components/ContactPage/ContactUsForm.jsx

import { useEffect, useState } from "react"
import { useForm }             from "react-hook-form"
import { contactUsAPI }        from "../../services/operations/contactAPI"
import CountryCode             from "../../data/countrycode.json"

export default function ContactUsForm() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  // Reset form after successful submission
  useEffect(() => {
    if (isSubmitSuccessful) reset()
  }, [isSubmitSuccessful, reset])

  async function onSubmit(data) {
    setLoading(true)
    await contactUsAPI(data)
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-7"
    >
      {/* Row 1 — First Name + Last Name */}
      <div className="flex flex-col gap-5 lg:flex-row">

        {/* First Name */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label className="text-sm text-richblack-5" htmlFor="firstname">
            First Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter first name"
            className="rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5
                       outline-none border border-richblack-700
                       placeholder:text-richblack-400"
            {...register("firstname", { required: "First name is required" })}
          />
          {errors.firstname && (
            <span className="text-xs text-pink-200">
              {errors.firstname.message}
            </span>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label className="text-sm text-richblack-5" htmlFor="lastname">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter last name"
            className="rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5
                       outline-none border border-richblack-700
                       placeholder:text-richblack-400"
            {...register("lastname")}
          />
        </div>

      </div>

      {/* Row 2 — Email */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-richblack-5" htmlFor="email">
          Email Address <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className="rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5
                     outline-none border border-richblack-700
                     placeholder:text-richblack-400"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-xs text-pink-200">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Row 3 — Phone Number */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-richblack-5" htmlFor="phoneNo">
          Phone Number <sup className="text-pink-200">*</sup>
        </label>
        <div className="flex gap-3">
          {/* Country Code Dropdown */}
          <select
            className="rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5
                       outline-none border border-richblack-700 w-[90px]"
            {...register("countrycode", { required: true })}
          >
            {CountryCode.map((item, index) => (
              <option key={index} value={item.dial_code}>
                {item.dial_code} ({item.code})
              </option>
            ))}
          </select>

          {/* Phone input */}
          <input
            type="tel"
            id="phoneNo"
            placeholder="Enter phone number"
            className="flex-1 rounded-[0.5rem] bg-richblack-800 p-3
                       text-richblack-5 outline-none border border-richblack-700
                       placeholder:text-richblack-400"
            {...register("phoneNo", {
              required: "Phone number is required",
              minLength: { value: 7,  message: "Invalid phone number" },
              maxLength: { value: 15, message: "Invalid phone number" },
            })}
          />
        </div>
        {errors.phoneNo && (
          <span className="text-xs text-pink-200">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* Row 4 — Message */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-richblack-5" htmlFor="message">
          Message <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="message"
          placeholder="Enter your message here"
          className="min-h-[130px] rounded-[0.5rem] bg-richblack-800 p-3
                     text-richblack-5 outline-none border border-richblack-700
                     resize-none placeholder:text-richblack-400"
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && (
          <span className="text-xs text-pink-200">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="rounded-[8px] bg-yellow-50 px-6 py-3 font-medium
                   text-richblack-900 disabled:opacity-60
                   disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

    </form>
  )
}