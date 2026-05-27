// frontend/src/components/Auth/Template.jsx

export default function Template({ title, desc1, desc2, image, formType, Form }) {
  return (
    <div className="grid min-h-screen place-items-center bg-richblack-900">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse items-center justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">

        {/* Left — Form */}
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {title}
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-richblack-100">{desc1}</span>{" "}
            <span className="font-edu-sa font-bold italic text-blue-100">
              {desc2}
            </span>
          </p>

          {/* Form renders its own Google button now */}
          <Form />
        </div>

        {/* Right — Image */}
        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
          <img
            src={image}
            alt="Students learning"
            width={558}
            height={504}
            loading="lazy"
            className="relative z-10 rounded-xl"
          />
          {/* Decorative shadows */}
          <div className="absolute -top-4 right-4 z-0 h-full w-full rounded-xl border-2 border-yellow-50 opacity-30" />
          <div className="absolute -bottom-4 left-4 z-0 h-full w-full rounded-xl bg-richblack-700 opacity-40" />
        </div>

      </div>
    </div>
  )
}