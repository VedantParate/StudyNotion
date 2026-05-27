// src/components/core/Dashboard/AddCourse/CourseBuilder/SubSectionModal.jsx

import { useEffect, useState } from "react"
import { useForm }             from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast }               from "react-hot-toast"
import { RxCross2 }            from "react-icons/rx"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseOperationsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import Upload        from "../Upload"

export default function SubSectionModal({
  modalType,
  sectionId,
  subSection,
  setModalData,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch   = useDispatch()
  const { course } = useSelector((state) => state.course)
  const { token }  = useSelector((state) => state.auth)

  const [loading, setLoading] = useState(false)

  // Pre-fill when viewing or editing
  useEffect(() => {
    if (modalType === "view" || modalType === "edit") {
      setValue("lectureTitle",       subSection.title)
      setValue("lectureDesc",        subSection.description)
      setValue("lectureVideo",       subSection.videoUrl)
    }
  }, [modalType, subSection, setValue])

  // ── Is any field changed? (for edit) ─────────────────────────────────────
  function isFormUpdated() {
    const cur = getValues()
    return (
      cur.lectureTitle !== subSection.title        ||
      cur.lectureDesc  !== subSection.description  ||
      cur.lectureVideo !== subSection.videoUrl
    )
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  async function onSubmit(data) {
    setLoading(true)

    if (modalType === "add") {
      const formData = new FormData()
      formData.append("sectionId",   sectionId)
      formData.append("title",       data.lectureTitle)
      formData.append("description", data.lectureDesc)
      formData.append("video",       data.lectureVideo)

      const result = await createSubSection(formData, token)
      if (result) {
        const updatedCourse = {
          ...course,
          courseContent: course.courseContent.map((sec) =>
            sec._id === sectionId ? result : sec
          ),
        }
        dispatch(setCourse(updatedCourse))
      }
    } else if (modalType === "edit") {
      if (!isFormUpdated()) {
        toast.error("No changes detected")
        setLoading(false)
        return
      }
      const formData = new FormData()
      formData.append("sectionId",    sectionId)
      formData.append("subSectionId", subSection._id)
      if (getValues("lectureTitle") !== subSection.title)
        formData.append("title",        getValues("lectureTitle"))
      if (getValues("lectureDesc") !== subSection.description)
        formData.append("description",  getValues("lectureDesc"))
      if (getValues("lectureVideo") !== subSection.videoUrl)
        formData.append("video",        getValues("lectureVideo"))

      const result = await updateSubSection(formData, token)
      if (result) {
        const updatedCourse = {
          ...course,
          courseContent: course.courseContent.map((sec) =>
            sec._id === sectionId ? result : sec
          ),
        }
        dispatch(setCourse(updatedCourse))
      }
    }

    setModalData(null)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto
                    bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[600px] rounded-lg border border-richblack-400
                      bg-richblack-800 p-6">

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xl font-semibold text-richblack-5">
            {modalType === "add"
              ? "Add Lecture"
              : modalType === "view"
              ? "View Lecture"
              : "Edit Lecture"}
          </p>
          <button
            type="button"
            onClick={() => setModalData(null)}
            className="text-richblack-300 hover:text-richblack-5"
          >
            <RxCross2 fontSize={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            video={true}
            viewData={modalType === "view" ? subSection?.videoUrl : null}
            editData={modalType === "edit" ? subSection?.videoUrl : null}
          />

          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              id="lectureTitle"
              placeholder="Enter lecture title"
              disabled={modalType === "view"}
              className="form-input rounded-[0.5rem] bg-richblack-700 p-3
                         text-richblack-5 outline-none
                         placeholder:text-richblack-400
                         disabled:cursor-not-allowed"
              {...register("lectureTitle", {
                required: "Lecture title is required",
              })}
            />
            {errors.lectureTitle && (
              <span className="text-xs text-pink-200">
                {errors.lectureTitle.message}
              </span>
            )}
          </div>

          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Lecture Description
            </label>
            <textarea
              id="lectureDesc"
              placeholder="Enter lecture description"
              disabled={modalType === "view"}
              className="form-input min-h-[100px] rounded-[0.5rem]
                         bg-richblack-700 p-3 text-richblack-5 outline-none
                         resize-none placeholder:text-richblack-400
                         disabled:cursor-not-allowed"
              {...register("lectureDesc")}
            />
          </div>

          {/* Submit Button — hidden in view mode */}
          {modalType !== "view" && (
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-yellow-50 px-5 py-2 font-semibold
                           text-richblack-900 disabled:opacity-60"
              >
                {loading
                  ? "Loading..."
                  : modalType === "add"
                  ? "Save"
                  : "Save Changes"}
              </button>
            </div>
          )}

        </form>
      </div>
    </div>
  )
}