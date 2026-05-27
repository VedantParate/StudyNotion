// src/pages/About.jsx

import { useEffect, useState, useCallback } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import HighlightText from "../components/core/HomePage/HighlightText"
import BannerImage1  from "../assets/Images/aboutus1.jpg"
import BannerImage2  from "../assets/Images/aboutus2.jpg"
import BannerImage3  from "../assets/Images/aboutus3.jpg"
import foundingStory from "../assets/Images/FoundingStory.jpg"
import ReviewSlider  from "../components/common/ReviewSlider"

const bannerImages = [BannerImage1, BannerImage2, BannerImage3]

const stats = [
  { count: "5K",   label: "Active Students" },
  { count: "10+",  label: "Mentors"         },
  { count: "200+", label: "Courses"         },
  { count: "50+",  label: "Awards"          },
]

// ─── Carousel Component ───────────────────────────────────────────────────────
function BannerCarousel() {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? bannerImages.length - 1 : c - 1))
  }, [])

  const next = useCallback(() => {
    setCurrent((c) => (c === bannerImages.length - 1 ? 0 : c + 1))
  }, [])

  // Auto-play every 3 seconds
  useEffect(() => {
    const timer = setInterval(next, 3000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className="relative w-full max-w-3xl mx-auto">

      {/* Image */}
      <div className="relative overflow-hidden rounded-xl shadow-[0px_0px_20px_0px] shadow-[#FC6767]">
        <img
          src={bannerImages[current]}
          alt={`Banner ${current + 1}`}
          className="w-full h-[320px] object-cover transition-all duration-500"
        />

        {/* Dark overlay for button visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 rounded-xl pointer-events-none" />
      </div>

      {/* Prev Button */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                   flex items-center justify-center
                   w-10 h-10 rounded-full
                   bg-richblack-900/70 hover:bg-richblack-900
                   text-white border border-richblack-600
                   transition-all duration-200 hover:scale-110"
        aria-label="Previous"
      >
        <FiChevronLeft size={20} />
      </button>

      {/* Next Button */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                   flex items-center justify-center
                   w-10 h-10 rounded-full
                   bg-richblack-900/70 hover:bg-richblack-900
                   text-white border border-richblack-600
                   transition-all duration-200 hover:scale-110"
        aria-label="Next"
      >
        <FiChevronRight size={20} />
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {bannerImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-yellow-50"
                : "w-2 bg-richblack-400 hover:bg-richblack-200"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <div className="text-richblack-5">

      {/* ─── Section 1 — Hero ──────────────────────────────────────────── */}
      <section className="bg-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col
                        items-center gap-10 py-20 text-center">

          {/* Tag line */}
          <p className="text-lg font-semibold text-richblack-300">
            About Us
          </p>

          {/* Heading */}
          <h1 className="text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a{" "}
            <HighlightText text="Brighter Future" />
          </h1>

          {/* Sub heading */}
          <p className="text-base text-richblack-300 lg:w-[95%]">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies,
            and nurturing a vibrant learning community.
          </p>

          {/* ── Carousel — replaces the 3 static images ── */}
          <BannerCarousel />

        </div>
      </section>

      {/* ─── Section 2 — Quote ─────────────────────────────────────────── */}
      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col
                        items-center gap-y-6 py-20 text-center">
          <blockquote className="text-3xl font-semibold lg:w-[70%]">
            We are passionate about revolutionizing the way we learn. Our
            innovative platform{" "}
            <HighlightText text="combines technology" />,{" "}
            <span className="font-bold text-brown-50">
              expertise
            </span>
            , and community to create an{" "}
            <span className="font-bold text-brown-50">
              unparalleled educational experience.
            </span>
          </blockquote>
        </div>
      </section>

      {/* ─── Section 3 — Founding Story ────────────────────────────────── */}
      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col
                        justify-between gap-10 py-24 lg:flex-row">

          {/* Left — Text */}
          <div className="flex flex-col gap-10 lg:w-[45%]">
            <h2 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D]
                           to-[#FCB045] bg-clip-text text-4xl font-semibold
                           text-transparent">
              Our Founding Story
            </h2>
            <p className="text-base text-richblack-300">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, high-quality education in a rapidly changing
              world.
            </p>
            <p className="text-base text-richblack-300">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or limited by geographical boundaries. We envisioned a
              platform that could bridge these gaps and empower individuals from
              all walks of life to unlock their full potential.
            </p>
          </div>

          {/* Right — Image (constrained size) */}
          <div className="lg:w-[45%] flex items-center">
            <img
              src={foundingStory}
              alt="Founding Story"
              className="w-full h-[320px] object-cover rounded-xl
                         shadow-[0px_0px_30px_0px] shadow-[#FC6767]"
            />
          </div>

        </div>
      </section>

      {/* ─── Section 4 — Vision & Mission ──────────────────────────────── */}
      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col
                        justify-between gap-10 py-16 lg:flex-row">

          {/* Vision */}
          <div className="flex flex-col gap-10 lg:w-[40%]">
            <h2 className="bg-gradient-to-b from-[#FF512F] to-[#F09819]
                           bg-clip-text text-4xl font-semibold text-transparent">
              Our Vision
            </h2>
            <p className="text-base text-richblack-300">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>

          {/* Mission */}
          <div className="flex flex-col gap-10 lg:w-[40%]">
            <h2 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA]
                           to-[#A6FFCB] bg-clip-text text-4xl font-semibold
                           text-transparent">
              Our Mission
            </h2>
            <p className="text-base text-richblack-300">
              Our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>

        </div>
      </section>

      {/* ─── Section 5 — Stats ─────────────────────────────────────────── */}
      <section className="bg-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col
                        items-center gap-10 py-16 text-center">
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-y-3">
                <p className="text-3xl font-bold text-richblack-5">
                  {stat.count}
                </p>
                <p className="text-sm font-semibold uppercase tracking-[1px]
                              text-richblack-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 6 — Team ──────────────────────────────────────────── */}
      <section className="mx-auto flex w-11/12 max-w-maxContent flex-col
                          items-center gap-10 py-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-4xl font-semibold">
            Meet The <HighlightText text="Passionate Educators" />
          </h2>
          <p className="w-[70%] text-base text-richblack-300">
            We are a passionate team of educators and learners dedicated to
            making quality education accessible to all. Our team of passionate
            educators and learners is committed to creating a brighter future
            through education.
          </p>
        </div>
      </section>

      {/* ─── Section 7 — Review Slider ─────────────────────────────────── */}
      <section className="mx-auto w-11/12 max-w-maxContent py-8">
        <ReviewSlider />
      </section>

    </div>
  )
}
