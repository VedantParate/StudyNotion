// src/components/core/Dashboard/AddCourse/CourseInformation/RequirementsField.jsx

import { useEffect, useState } from "react"

import { useSelector } from "react-redux"

import { MdClose } from "react-icons/md"


export default function RequirementsField({

  name,

  label,

  register,

  errors,

  setValue,

  getValues,

}) {

  const { editCourse, course } = useSelector((state) => state.course)

  const [requirement, setRequirement] = useState("")


  // Pre-fill when editing

  useEffect(() => {

    if (editCourse) {

      setValue(name, course?.instructions ?? [])

    } else {

      setValue(name, [])

    }

  }, [editCourse, course, name, setValue])


  function handleAddRequirement() {

    const trimmed = requirement.trim()

    const currentRequirements = getValues(name) ?? []

    if (trimmed && !currentRequirements.includes(trimmed)) {

      setValue(name, [...currentRequirements, trimmed])

      setRequirement("")

    }

  }


  function handleRemoveRequirement(index) {

    const currentRequirements = getValues(name) ?? []

    const updated = currentRequirements.filter((_, i) => i !== index)

    setValue(name, updated)

  }


  return (

    <div className="flex flex-col space-y-2">

      {/* Label */}

      <label className="text-sm text-richblack-5" htmlFor={name}>

        {label} <sup className="text-pink-200">*</sup>

      </label>


      {/* Existing requirements */}

      <div className="flex flex-col gap-y-2">

        {(getValues(name) ?? []).map((req, index) => (

          <div

            key={index}

            className="flex items-center justify-between rounded-md

                       bg-richblack-600 px-3 py-2"

          >

            <span className="text-sm text-richblack-5">{req}</span>

            <button

              type="button"

              onClick={() => handleRemoveRequirement(index)}

              className="text-richblack-300 hover:text-richblack-5"

            >

              <MdClose />

            </button>

          </div>

        ))}

      </div>


      {/* Input + Add button */}

      <div className="flex gap-x-2">

        <input

          type="text"

          id={name}

          value={requirement}

          onChange={(e) => setRequirement(e.target.value)}

          placeholder="Enter a requirement"

          className="flex-1 rounded-[0.5rem] bg-richblack-700 p-3

                     text-richblack-5 outline-none

                     placeholder:text-richblack-400"

        />

        <button

          type="button"

          onClick={handleAddRequirement}

          className="font-semibold text-yellow-50"

        >

          Add

        </button>

      </div>


      {/* Hidden input for RHF validation */}

      <input

        type="text"

        className="hidden"

        id={`${name}-hidden`}

        {...register(name, { required: `${label} is required` })}

      />


      {errors[name] && (

        <span className="text-xs text-pink-200">{errors[name].message}</span>

      )}

    </div>

  )

}