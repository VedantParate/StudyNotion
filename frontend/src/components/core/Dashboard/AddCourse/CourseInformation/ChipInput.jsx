// src/components/core/Dashboard/AddCourse/CourseInformation/ChipInput.jsx

import { useEffect } from "react"

import { MdClose } from "react-icons/md"

import { useSelector } from "react-redux"


export default function ChipInput({

  label,

  name,

  placeholder,

  register,

  errors,

  setValue,

  getValues,

}) {

  const { editCourse, course } = useSelector((state) => state.course)


  // Pre-fill chips when editing

  useEffect(() => {

    if (editCourse) {

      setValue(name, course?.tag ?? [])

    } else {

      setValue(name, [])

    }

  }, [editCourse, course, name, setValue])


  function handleKeyDown(e) {

    if (e.key === "Enter" || e.key === ",") {

      e.preventDefault()

      const inputValue = e.target.value.trim()

      const currentChips = getValues(name) ?? []

      if (inputValue && !currentChips.includes(inputValue)) {

        const newChips = [...currentChips, inputValue]

        setValue(name, newChips)

        e.target.value = ""

      }

    }

  }


  function handleDeleteChip(chipIndex) {

    const currentChips = getValues(name) ?? []

    const newChips = currentChips.filter((_, i) => i !== chipIndex)

    setValue(name, newChips)

  }


  return (

    <div className="flex flex-col space-y-2">

      {/* Label */}

      <label className="text-sm text-richblack-5" htmlFor={name}>

        {label} <sup className="text-pink-200">*</sup>

      </label>


      {/* Chips display */}

      <div

        className="flex flex-wrap w-full gap-y-2 gap-x-2 rounded-[0.5rem]

                   bg-richblack-700 p-3"

      >

        {/* Existing chips */}

        {(getValues(name) ?? []).map((chip, index) => (

          <div

            key={index}

            className="flex items-center gap-1 rounded-full bg-yellow-400

                       px-2 py-1 text-sm text-richblack-900 font-medium"

          >

            <span>{chip}</span>

            <button

              type="button"

              onClick={() => handleDeleteChip(index)}

              className="focus:outline-none"

            >

              <MdClose className="text-richblack-900" />

            </button>

          </div>

        ))}


        {/* Input field */}

        <input

          type="text"

          id={name}

          placeholder={placeholder}

          onKeyDown={handleKeyDown}

          className="flex-1 bg-transparent text-richblack-5 outline-none

                     placeholder:text-richblack-400 min-w-[120px]"

        />

      </div>


      {/* Hidden input for react-hook-form registration */}

      <input

        type="text"

        id={`${name}-hidden`}

        className="hidden"

        {...register(name, { required: `${label} is required` })}

      />


      {errors[name] && (

        <span className="text-xs text-pink-200">{errors[name].message}</span>

      )}

    </div>

  )

}