// src/components/core/HomePage/CodeBlocks.jsx
import React from "react";
import { TypeAnimation } from "react-type-animation";
import CTAButton from "./CTAButton";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/* ── Left / Text side ── */}
      <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 text-base font-bold w-[85%]">
          {subheading}
        </div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            {ctabtn1.btnText}
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* ── Right / Code side ── */}
      <div className="flex flex-row h-fit w-[100%] py-4 lg:w-[470px]">
        {/* Line numbers */}
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          {Array.from({ length: 11 }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Animated code */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-mono font-bold ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{ whiteSpace: "pre-line", display: "block" }}
            omitDeletionAnimation={true}
          />
        </div>

        {backgroundGradient}
      </div>
    </div>
  );
};

export default CodeBlocks;