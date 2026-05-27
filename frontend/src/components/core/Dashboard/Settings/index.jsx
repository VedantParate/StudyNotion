// src/components/core/Dashboard/Settings/index.jsx

import UpdateProfilePicture from "./UpdateProfilePicture"
import EditProfile          from "./EditProfile"
import ChangePassword       from "./ChangePassword"
import DeleteAccount        from "./DeleteAccount"

export default function Settings() {
  return (
    <div className="mx-auto w-full max-w-[800px]">

      {/* Page Heading */}
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>

      {/* Profile Picture */}
      <UpdateProfilePicture />

      {/* Personal Info Form */}
      <EditProfile />

      {/* Change Password */}
      <ChangePassword />

      {/* Delete Account */}
      <DeleteAccount />

    </div>
  )
}