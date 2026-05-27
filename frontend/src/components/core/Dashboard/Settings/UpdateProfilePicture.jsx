// src/components/core/Dashboard/Settings/UpdateProfilePicture.jsx

import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture } from "../../../../services/operations/profileAPI"

export default function UpdateProfilePicture() {
  const dispatch  = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { user }  = useSelector((state) => state.profile)

  const [loading,        setLoading]        = useState(false)
  const [imageFile,      setImageFile]      = useState(null)
  const [previewSource, setPreviewSource]  = useState(null)

  const fileInputRef = useRef(null)

  // Generate a preview URL whenever a new file is chosen
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.onloadend = () => setPreviewSource(reader.result)
    }
  }, [imageFile])

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) setImageFile(file)
  }

  async function handleFileUpload() {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      await dispatch(updateDisplayPicture(token, formData))
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between rounded-md border
                    border-richblack-700 bg-richblack-800 p-8 px-12">
      {/* Avatar Preview */}
      <div className="flex items-center gap-x-4">
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="space-y-2">
          <p className="text-lg font-semibold text-richblack-5">
            Change Profile Picture
          </p>
          <div className="flex flex-row gap-3">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            {/* Select button */}
            <button
              onClick={() => fileInputRef.current.click()}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5
                         font-semibold text-richblack-50"
            >
              Select
            </button>
            {/* Upload button — only shown after a file is chosen */}
            {imageFile && (
              <button
                onClick={handleFileUpload}
                disabled={loading}
                className="flex cursor-pointer items-center gap-x-2 rounded-md
                           bg-yellow-50 py-2 px-5 font-semibold text-richblack-900"
              >
                <FiUpload />
                {loading ? "Uploading..." : "Upload"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}