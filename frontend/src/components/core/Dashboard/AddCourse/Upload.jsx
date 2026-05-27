// src/components/core/Dashboard/AddCourse/Upload.jsx

import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { MdClose } from "react-icons/md"

export default function Upload({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
  editData = null,
  video = false,
  viewData = null,
}) {
  const [selectedFile,  setSelectedFile]  = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )

  // Register the field with react-hook-form
  useEffect(() => {
    register(name, { required: true })
  }, [register, name])

  // Update preview whenever file changes
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onloadend = () => setPreviewSource(reader.result)
    }
  }, [selectedFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video ? { "video/*": [] } : { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        setSelectedFile(file)
        setValue(name, file)
      }
    },
  })

  function handleCancel() {
    setSelectedFile(null)
    setPreviewSource("")
    setValue(name, null)
  }

  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      <label className="text-sm text-richblack-5">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md
          border-2 border-dashed border-richblack-500 transition-all`}
      >
        {/* Single input — no extra ref, getInputProps handles it */}
        <input {...getInputProps()} />

        {previewSource ? (
          // ── Preview ──────────────────────────────────────────────────
          <div className="relative flex w-full flex-col p-4">
            {video ? (
              <video
                src={previewSource}
                controls
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            )}

            {/* Remove button — hidden in view-only mode */}
            {!viewData && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCancel()
                }}
                className="absolute top-2 right-2 flex h-6 w-6 items-center
                           justify-center rounded-full bg-richblack-700
                           text-richblack-100"
              >
                <MdClose />
              </button>
            )}
          </div>
        ) : (
          // ── Drop zone content ─────────────────────────────────────────
          <div className="flex w-full flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center
                            rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {video ? "video" : "image"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span>
            </p>
            <ul className="mt-4 flex flex-col items-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1280x720</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="text-xs text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}