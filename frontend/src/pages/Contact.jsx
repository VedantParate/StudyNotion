// src/pages/Contact.jsx

import { MdLocalPhone }   from "react-icons/md"
import { HiChatBubbleLeftRight } from "react-icons/hi2"
import { BiWorld }        from "react-icons/bi"
import ContactUsForm      from "../components/ContactPage/ContactUsForm"
import ReviewSlider       from "../components/common/ReviewSlider"

const contactInfo = [
  {
    icon:        <HiChatBubbleLeftRight />,
    heading:     "Chat on us",
    description: "Our friendly team is here to help.",
    contact:     "info@studynotion.com",
  },
  {
    icon:        <BiWorld />,
    heading:     "Visit us",
    description: "Come and say hello at our office HQ.",
    contact:     "Maharashtra, India",
  },
  {
    icon:        <MdLocalPhone />,
    heading:     "Call us",
    description: "Mon - Fri from 8am to 5pm.",
    contact:     "+91-85529xxxxx",
  },
]

export default function Contact() {
  return (
    <div className="text-richblack-5">

      {/* ─── Main Section ──────────────────────────────────────────────── */}
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent
                      flex-col justify-between gap-10 lg:flex-row">

        {/* Left — Contact Info Cards */}
        <div className="flex flex-col gap-6 rounded-xl bg-richblack-800
                        p-4 lg:w-[40%] lg:p-6">

          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-[2px] p-3"
            >
              {/* Icon + Heading */}
              <div className="flex items-center gap-3">
                <div className="text-richblack-300 text-lg">
                  {item.icon}
                </div>
                <h2 className="text-lg font-semibold text-richblack-5">
                  {item.heading}
                </h2>
              </div>

              {/* Description */}
              <p className="text-sm text-richblack-300 mt-1">
                {item.description}
              </p>

              {/* Contact detail */}
              <p className="text-sm font-semibold text-richblack-100 mt-1">
                {item.contact}
              </p>
            </div>
          ))}

        </div>

        {/* Right — Contact Form */}
        <div className="rounded-xl border border-richblack-600
                        bg-richblack-800 p-7 lg:w-[60%] lg:p-14">

          {/* Heading */}
          <h1 className="mb-3 text-4xl font-semibold leading-10
                         text-richblack-5">
            Got a Idea? We&apos;ve got the skills. Let&apos;s team up
          </h1>

          {/* Subtitle */}
          <p className="mb-7 text-richblack-300">
            Tell us more about yourself and what you&apos;re got in mind.
          </p>

          {/* Form */}
          <ContactUsForm />

        </div>

      </div>

      {/* ─── Review Slider ─────────────────────────────────────────────── */}
      <div className="mx-auto my-20 w-11/12 max-w-maxContent">
        <ReviewSlider />
      </div>

    </div>
  )
}