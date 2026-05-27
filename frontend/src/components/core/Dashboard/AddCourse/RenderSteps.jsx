// src/components/core/Dashboard/AddCourse/RenderSteps.jsx

import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import CourseBuilderForm     from "./CourseBuilder/CourseBuilderForm"
import PublishCourse         from "./PublishCourse/index"

// Step metadata
const steps = [
  { id: 1, title: "Course Information" },
  { id: 2, title: "Course Builder"     },
  { id: 3, title: "Publish"            },
]

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  return (
    <>
      {/* ── Step Indicator ─────────────────────────────────────────────── */}
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <div key={item.id} className="flex flex-col items-center">

            {/* Circle + connector line */}
            <div className="flex items-center">

              {/* Circle */}
              <div
                className={`grid h-[34px] w-[34px] place-items-center rounded-full
                            border-[1px] text-sm font-semibold transition-all ${
                              step === item.id
                                ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                                : step > item.id
                                ? "border-richblack-700 bg-richblack-700 text-richblack-5"
                                : "border-richblack-700 bg-richblack-800 text-richblack-300"
                            }`}
              >
                {step > item.id ? (
                  <FaCheck className="text-yellow-50" />
                ) : (
                  item.id
                )}
              </div>

              {/* Connector — not after last step */}
              {item.id !== steps.length && (
                <div
                  className={`h-[1px] w-[100px] transition-all lg:w-[200px] ${
                    step > item.id
                      ? "border-b border-richblack-500 bg-richblack-500"
                      : "border-b border-dashed border-richblack-500"
                  }`}
                />
              )}
            </div>

            {/* Step label — hidden on small screens for space */}
            <p
              className={`hidden sm:block mt-2 text-sm font-medium ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>

          </div>
        ))}
      </div>

      {/* ── Active Form ────────────────────────────────────────────────── */}
      <div className="mt-8">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </>
  )
}