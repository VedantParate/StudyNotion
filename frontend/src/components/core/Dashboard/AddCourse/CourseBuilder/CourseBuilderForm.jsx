// src/components/core/Dashboard/AddCourse/CourseBuilder/CourseBuilderForm.jsx

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { BiSolidPlusCircle } from "react-icons/bi"
import { MdNavigateNext } from "react-icons/md"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseOperationsAPI"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"

import NestedView        from "./NestedView"
import ConfirmationModal from "../../../../common/ConfirmationModal"

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token }  = useSelector((state) => state.auth)
  const dispatch   = useDispatch()

  const [loading,           setLoading]           = useState(false)
  const [editSectionName,   setEditSectionName]   = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  // ── Submit: create or rename a section ──────────────────────────────────
  async function onSubmit(data) {
    setLoading(true)
    let result

    if (editSectionName) {
      // Rename existing section
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId:   editSectionName,
          courseId:    course._id,
        },
        token
      )
    } else {
      // Create new section
      result = await createSection(
        { sectionName: data.sectionName, courseId: course._id },
        token
      )
    }

    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    setLoading(false)
  }

  function cancelEdit() {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  function handleChangeEditSectionName(sectionId, sectionName) {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  // ── Go to next step (only if at least one section exists) ───────────────
  function goToNext() {
    if (!course?.courseContent?.length) {
      toast.error("Please add at least one section")
      return
    }
    if (course.courseContent.some((sec) => !sec.subSection?.length)) {
      toast.error("Please add at least one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  function goBack() {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <>
      <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-8">

        {/* Heading */}
        <p className="text-2xl font-semibold text-richblack-5">
          Course Builder
        </p>

        {/* ── Add / Rename Section Form ─────────────────────────────── */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="sectionName">
              Section Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              id="sectionName"
              placeholder="Add a section to build your course"
              className="form-input rounded-[0.5rem] bg-richblack-700 p-3
                         text-richblack-5 outline-none
                         placeholder:text-richblack-400"
              {...register("sectionName", {
                required: "Section name is required",
              })}
            />
            {errors.sectionName && (
              <span className="text-xs text-pink-200">
                {errors.sectionName.message}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-x-2 rounded-md border
                         border-yellow-50 bg-transparent px-5 py-2
                         font-semibold text-yellow-50 disabled:opacity-60"
            >
              <BiSolidPlusCircle />
              {editSectionName ? "Edit Section Name" : "Create Section"}
            </button>

            {editSectionName && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-sm text-richblack-300 underline"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* ── Nested Section / Subsection View ─────────────────────── */}
        {course?.courseContent?.length > 0 && (
          <NestedView
            handleChangeEditSectionName={handleChangeEditSectionName}
            setConfirmationModal={setConfirmationModal}
          />
        )}

        {/* ── Navigation Buttons ───────────────────────────────────── */}
        <div className="flex justify-end gap-x-4">
          <button
            type="button"
            onClick={goBack}
            className="rounded-md bg-richblack-700 px-5 py-2 font-semibold
                       text-richblack-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="flex items-center gap-x-2 rounded-md bg-yellow-50
                       px-5 py-2 font-semibold text-richblack-900"
          >
            Next <MdNavigateNext />
          </button>
        </div>

      </div>

      {/* Confirmation Modal for delete */}
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  )
}