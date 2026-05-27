// src/components/core/HomePage/InstructorSection.jsx
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/instructor.jpg";
import HighlightText from "./HighlightText";
import CTAButton from "./CTAButton";

const InstructorSection = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        {/* Left: instructor image */}
        <div className="lg:w-[50%]">
          <img
            src={Instructor}
            alt="Instructor"
            className="shadow-white shadow-[-20px_-20px_0_0]"
          />
        </div>

        {/* Right: text + CTA */}
        <div className="lg:w-[50%] flex flex-col gap-10">
          <div className="text-4xl font-semibold w-[50%]">
            Become an
            <HighlightText text={" Instructor"} />
          </div>

          <p className="font-medium text-[16px] text-richblack-300 w-[80%]">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto="/signup">
              <div className="flex items-center gap-3">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;