// src/components/core/Dashboard/AddCourse/CourseInformation/CourseInformationForm.jsx

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"

import { apiConnector }   from "../../../../../services/apiConnector"
import { categories }     from "../../../../../services/apis"
import { createCourse, editCourse } from "../../../../../services/operations/courseOperationsAPI"
import { setCourse, setStep }       from "../../../../../slices/courseSlice"
import { COURSE_STATUS }            from "../../../../../utils/constants"

import ChipInput         from "./ChipInput"
import RequirementsField from "./RequirementsField"
import Upload            from "../Upload"

const { CATEGORIES_API } = categories

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseTitle:        "",
      courseShortDesc:    "",
      coursePrice:        "",
      courseTags:         [],
      courseBenefits:     "",
      courseCategory:     "",
      courseRequirements: [],
      courseImage:        null,
    },
  })

  const dispatch              = useDispatch()
  const { token }             = useSelector((state) => state.auth)
  const { course, editCourse: isEditCourse } = useSelector((state) => state.course)

  const [loading,          setLoading]          = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  // ── Fetch categories ────────────────────────────────────────────────────
  useEffect(() => {
    async function fetchCategories() {
      setLoading(true)
      try {
        const res = await apiConnector("GET", CATEGORIES_API)
        if (res?.data?.data) setCourseCategories(res.data.data)
      } catch {
        toast.error("Could not fetch categories")
      }
      setLoading(false)
    }
    fetchCategories()
  }, [])

  // ── Pre-fill form when editing ──────────────────────────────────────────
  useEffect(() => {
    if (isEditCourse) {
      setValue("courseTitle",        course.courseName)
      setValue("courseShortDesc",    course.courseDescription)
      setValue("coursePrice",        course.price)
      setValue("courseTags",         course.tag        ?? [])
      setValue("courseBenefits",     course.whatYouWillLearn)
      setValue("courseCategory",     course.category?._id ?? course.category)
      setValue("courseRequirements", course.instructions ?? [])
      setValue("courseImage",        course.thumbnail)
    }
    // eslint-disable-next-line
  }, [isEditCourse])

  // ── Check if course data has changed (for edit) ─────────────────────────
  function isFormUpdated() {
    const currentValues = getValues()
    return (
      currentValues.courseTitle        !== course.courseName        ||
      currentValues.courseShortDesc    !== course.courseDescription  ||
      currentValues.coursePrice        !== course.price              ||
      currentValues.courseTags         !== course.tag                ||
      currentValues.courseBenefits     !== course.whatYouWillLearn  ||
      currentValues.courseCategory     !== (course.category?._id ?? course.category) ||
      currentValues.courseRequirements !== course.instructions       ||
      currentValues.courseImage        !== course.thumbnail
    )
  }

  // ── Submit ──────────────────────────────────────────────────────────────
  async function onSubmit(data) {
    if (isEditCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()

        formData.append("courseId", course._id)

        if (currentValues.courseTitle     !== course.courseName)
          formData.append("courseName",        currentValues.courseTitle)

        if (currentValues.courseShortDesc !== course.courseDescription)
          formData.append("courseDescription", currentValues.courseShortDesc)

        if (currentValues.coursePrice     !== course.price)
          formData.append("price",             currentValues.coursePrice)

        if (currentValues.courseTags      !== course.tag)
          formData.append("tag",               JSON.stringify(currentValues.courseTags))

        if (currentValues.courseBenefits  !== course.whatYouWillLearn)
          formData.append("whatYouWillLearn",  currentValues.courseBenefits)

        if (currentValues.courseCategory  !== course.category)
          formData.append("category",          currentValues.courseCategory)

        if (currentValues.courseRequirements !== course.instructions)
          formData.append("instructions",      JSON.stringify(currentValues.courseRequirements))

        if (currentValues.courseImage     !== course.thumbnail)
          formData.append("thumbnailImage",    currentValues.courseImage)

        setLoading(true)
        const result = await editCourse(formData, token)
        setLoading(false)

        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes detected")
      }
      return
    }

    // ── Create new course ─────────────────────────────────────────────────
    const formData = new FormData()
    formData.append("courseName",        data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price",             data.coursePrice)
    formData.append("tag",               JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn",  data.courseBenefits)
    formData.append("category",          data.courseCategory)
    formData.append("instructions",      JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage",    data.courseImage)
    formData.append("status",            COURSE_STATUS.DRAFT)

    setLoading(true)
    const result = await createCourse(formData, token)
    setLoading(false)

    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-8"
    >

      {/* ── Course Title ─────────────────────────────────────────────── */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          id="courseTitle"
          placeholder="Enter course title"
          className="form-input rounded-[0.5rem] bg-richblack-700 p-3
                     text-richblack-5 outline-none placeholder:text-richblack-400"
          {...register("courseTitle", { required: "Course title is required" })}
        />
        {errors.courseTitle && (
          <span className="text-xs text-pink-200">{errors.courseTitle.message}</span>
        )}
      </div>

      {/* ── Short Description ────────────────────────────────────────── */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter short description"
          className="form-input min-h-[130px] rounded-[0.5rem] bg-richblack-700
                     p-3 text-richblack-5 outline-none resize-none
                     placeholder:text-richblack-400"
          {...register("courseShortDesc", {
            required: "Course description is required",
          })}
        />
        {errors.courseShortDesc && (
          <span className="text-xs text-pink-200">{errors.courseShortDesc.message}</span>
        )}
      </div>

      {/* ── Price ────────────────────────────────────────────────────── */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            type="number"
            id="coursePrice"
            placeholder="Enter course price"
            className="form-input w-full rounded-[0.5rem] bg-richblack-700
                       p-3 pl-10 text-richblack-5 outline-none
                       placeholder:text-richblack-400"
            {...register("coursePrice", {
              required:      "Course price is required",
              valueAsNumber: true,
              min: { value: 0, message: "Price cannot be negative" },
            })}
          />
          <HiOutlineCurrencyRupee
            className="absolute left-3 top-1/2 -translate-y-1/2
                       text-richblack-400 text-xl"
          />
        </div>
        {errors.coursePrice && (
          <span className="text-xs text-pink-200">{errors.coursePrice.message}</span>
        )}
      </div>

      {/* ── Category ─────────────────────────────────────────────────── */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          className="form-select rounded-[0.5rem] bg-richblack-700 p-3
                     text-richblack-5 outline-none"
          {...register("courseCategory", {
            required: "Course category is required",
          })}
        >
          <option value="" disabled>Choose a category</option>
          {!loading &&
            courseCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="text-xs text-pink-200">{errors.courseCategory.message}</span>
        )}
      </div>

      {/* ── Tags / Chip Input ─────────────────────────────────────────── */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* ── Thumbnail Upload ──────────────────────────────────────────── */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        editData={isEditCourse ? course?.thumbnail : null}
      />

      {/* ── Benefits ─────────────────────────────────────────────────── */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the Course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          className="form-input min-h-[130px] rounded-[0.5rem] bg-richblack-700
                     p-3 text-richblack-5 outline-none resize-none
                     placeholder:text-richblack-400"
          {...register("courseBenefits", {
            required: "Course benefits are required",
          })}
        />
        {errors.courseBenefits && (
          <span className="text-xs text-pink-200">{errors.courseBenefits.message}</span>
        )}
      </div>

      {/* ── Requirements ─────────────────────────────────────────────── */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements / Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* ── Action Buttons ────────────────────────────────────────────── */}
      <div className="flex justify-end gap-x-4">
        {isEditCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="rounded-md bg-richblack-700 px-5 py-2 font-semibold
                       text-richblack-50 cursor-pointer"
          >
            Continue Without Saving
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-x-2 rounded-md bg-yellow-50
                     px-5 py-2 font-semibold text-richblack-900
                     disabled:opacity-60"
        >
          {isEditCourse ? "Save Changes" : "Next"}
          <MdNavigateNext />
        </button>
      </div>

    </form>
  )
}