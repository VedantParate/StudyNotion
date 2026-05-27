// src/components/core/HomePage/TimelineSection.jsx

import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skill",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">

      {/* ── Left: Timeline List ──────────────────────────────────────── */}
      <div className="flex flex-col gap-6 lg:w-[45%]">
        {timeline.map((element, index) => (
          <div key={index} className="flex flex-row items-start gap-5">

            {/* Icon circle */}
            <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center
                            rounded-full bg-white shadow-[0_0_62px_0_#00000012]">
              <img src={element.Logo} alt={element.heading} />
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <h2 className="font-semibold text-[18px] text-richblack-800">
                {element.heading}
              </h2>
              <p className="text-base text-richblack-600">
                {element.Description}
              </p>
            </div>

            {/* Vertical connector line (not on last item) */}
            {index !== timeline.length - 1 && (
              <div className="absolute ml-[23px] mt-[54px] h-10 w-[2px] bg-richblack-100" />
            )}
          </div>
        ))}
      </div>

      {/* ── Right: Single Image with Stats Overlay ───────────────────── */}
      <div className="relative w-full lg:w-[45%]">

        {/* Image */}
        <img
          src={timelineImage}
          alt="timeline"
          className="w-full h-[380px] object-cover rounded-xl
                     shadow-[0px_0px_30px_0px] shadow-blue-200"
        />

        {/* Stats bar overlaid at the bottom of the image */}
        <div className="absolute bottom-0 left-0 right-0
                        flex flex-row items-center justify-center
                        bg-caribbeangreen-700 text-white uppercase
                        py-5 px-4 rounded-b-xl">

          {/* Years of Experience */}
          <div className="flex flex-row items-center gap-4
                          border-r border-caribbeangreen-300 px-6">
            <p className="text-3xl font-bold">10</p>
            <p className="text-caribbeangreen-300 text-sm leading-tight">
              Years of<br />Experience
            </p>
          </div>

          {/* Types of Courses */}
          <div className="flex flex-row items-center gap-4 px-6">
            <p className="text-3xl font-bold">250</p>
            <p className="text-caribbeangreen-300 text-sm leading-tight">
              Types of<br />Courses
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TimelineSection;