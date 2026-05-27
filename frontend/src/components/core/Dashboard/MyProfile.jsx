// frontend/src/components/core/Dashboard/MyProfile.jsx

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RiEditBoxLine } from "react-icons/ri"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div className="mx-auto w-full max-w-[800px]">

      {/* Page Heading */}
      <h1 className="mb-8 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      {/* ─── Point 4 — Cover Banner Strip ─────────────────────────────── */}
      <div className="h-24 w-full rounded-t-xl bg-gradient-to-r from-richblack-700 via-richblack-600 to-richblack-700" />

      {/* ─── Section 1 — Avatar + Name + Edit ─────────────────────────── */}
      <div className="flex items-center justify-between rounded-b-xl border border-t-0 border-richblack-700
                      bg-richblack-800 p-8 px-12 mb-6 -mt-1">
        <div className="flex items-center gap-x-4">
          {/* Avatar — overlapping the cover strip */}
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover border-4 border-richblack-800 -mt-16"
          />
          {/* Name + Email */}
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
            <span className="inline-block mt-1 rounded-full bg-richblack-700 px-3 py-0.5 text-xs text-yellow-50 font-medium">
              {user?.accountType}
            </span>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="flex cursor-pointer items-center gap-x-2 rounded-md
                     bg-yellow-50 py-2 px-5 font-semibold text-richblack-900
                     hover:bg-yellow-25 transition-all duration-200"
        >
          <RiEditBoxLine />
          Edit
        </button>
      </div>

      {/* ─── Section 2 — About ─────────────────────────────────────────── */}
      <div className="my-6 flex flex-col gap-y-6 rounded-xl border border-richblack-700
                      bg-richblack-800 p-8 px-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex cursor-pointer items-center gap-x-2 rounded-md
                       bg-yellow-50 py-2 px-5 font-semibold text-richblack-900
                       hover:bg-yellow-25 transition-all duration-200"
          >
            <RiEditBoxLine />
            Edit
          </button>
        </div>

        {/* Point 5 — improved empty state for About */}
        {user?.additionalDetails?.about ? (
          <p className="text-sm font-medium text-richblack-5">
            {user.additionalDetails.about}
          </p>
        ) : (
          <p className="text-sm text-richblack-400 italic border border-dashed border-richblack-600 rounded-lg p-4 text-center">
            ✏️ No bio yet — click <span className="text-yellow-50 font-semibold not-italic">Edit</span> to tell others about yourself.
          </p>
        )}
      </div>

      {/* ─── Section 3 — Personal Details ─────────────────────────────── */}
      <div className="my-6 flex flex-col gap-y-10 rounded-xl border border-richblack-700
                      bg-richblack-800 p-8 px-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex cursor-pointer items-center gap-x-2 rounded-md
                       bg-yellow-50 py-2 px-5 font-semibold text-richblack-900
                       hover:bg-yellow-25 transition-all duration-200"
          >
            <RiEditBoxLine />
            Edit
          </button>
        </div>

        {/* Details Grid */}
        <div className="flex max-w-[500px] flex-col gap-y-6">

          {/* Row 1 */}
          <div className="flex flex-col gap-y-6 sm:flex-row sm:gap-x-20">
            {/* First Name */}
            <div className="flex flex-col gap-y-2">
              <p className="text-sm text-richblack-400">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName ?? "Add First Name"}
              </p>
            </div>
            {/* Last Name */}
            <div className="flex flex-col gap-y-2">
              <p className="text-sm text-richblack-400">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName ?? "Add Last Name"}
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-y-6 sm:flex-row sm:gap-x-20">
            {/* Email */}
            <div className="flex flex-col gap-y-2">
              <p className="text-sm text-richblack-400">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email ?? "Add Email"}
              </p>
            </div>
            {/* Phone */}
            <div className="flex flex-col gap-y-2">
              <p className="text-sm text-richblack-400">Phone Number</p>
              <p className={`text-sm font-medium ${
                user?.additionalDetails?.contactNumber
                  ? "text-richblack-5"
                  : "text-richblack-400"
              }`}>
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col gap-y-6 sm:flex-row sm:gap-x-20">
            {/* Gender */}
            <div className="flex flex-col gap-y-2">
              <p className="text-sm text-richblack-400">Gender</p>
              <p className={`text-sm font-medium ${
                user?.additionalDetails?.gender
                  ? "text-richblack-5"
                  : "text-richblack-400"
              }`}>
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
            {/* Date of Birth */}
            <div className="flex flex-col gap-y-2">
              <p className="text-sm text-richblack-400">Date of Birth</p>
              <p className={`text-sm font-medium ${
                user?.additionalDetails?.dateOfBirth
                  ? "text-richblack-5"
                  : "text-richblack-400"
              }`}>
                {user?.additionalDetails?.dateOfBirth
                  ? new Date(user.additionalDetails.dateOfBirth)
                      .toLocaleDateString("en-IN", {
                        day:   "2-digit",
                        month: "long",
                        year:  "numeric",
                      })
                  : "Add Date of Birth"}
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
