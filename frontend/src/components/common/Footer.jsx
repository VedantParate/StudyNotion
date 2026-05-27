import { Link } from "react-router-dom";

import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FooterLink2 } from "../../data/footer-links";

// Footer link columns (left side)
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

export default function Footer() {
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14 flex-col">
        {/* ─── Left Section ─── */}
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700 gap-8 lg:gap-3">

          {/* Logo + Social Links col */}
          <div className="lg:w-[30%] flex flex-col gap-3 mb-7 lg:pl-0">
            <img src={Logo} alt="StudyNotion" className="object-contain h-[28px] w-[160px]" />
            <h1 className="text-richblack-50 font-semibold text-[16px]">Company</h1>
            <div className="flex flex-col gap-2">
              {["About", "Careers", "Affiliates"].map((item, i) => (
                <Link
                  key={i}
                  to={item === "About" ? "/about" : item === "Careers" ? "/" : "/"}
                  className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex gap-3 text-lg mt-1">
              {/* Social icons as text placeholders — swap with react-icons if desired */}
              {["fa", "tw", "yt", "li"].map((s, i) => (
                <Link key={i} to="/">
                  <div className="rounded-full border border-richblack-700 p-2 text-richblack-400 hover:text-richblack-50 transition-all duration-200 text-xs">
                    {s.toUpperCase()}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="lg:w-[20%] flex flex-col gap-3 mb-7">
            <h1 className="text-richblack-50 font-semibold text-[16px]">Resources</h1>
            <div className="flex flex-col gap-2">
              {Resources.map((item, i) => (
                <Link
                  key={i}
                  to="/"
                  className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>

            <h1 className="text-richblack-50 font-semibold text-[16px] mt-5">Support</h1>
            <Link
              to="/contact"
              className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
            >
              Help Center
            </Link>
          </div>

          {/* Plans */}
          <div className="lg:w-[20%] flex flex-col gap-3 mb-7">
            <h1 className="text-richblack-50 font-semibold text-[16px]">Plans</h1>
            <div className="flex flex-col gap-2">
              {Plans.map((item, i) => (
                <Link
                  key={i}
                  to="/"
                  className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>

            <h1 className="text-richblack-50 font-semibold text-[16px] mt-5">Community</h1>
            <div className="flex flex-col gap-2">
              {Community.map((item, i) => (
                <Link
                  key={i}
                  to="/"
                  className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Right section: dynamic catalog links */}
          <div className="lg:w-[30%] flex flex-col gap-3 mb-7">
            {FooterLink2.map((item, i) => (
              <div key={i} className="flex flex-col gap-3">
                <h1 className="text-richblack-50 font-semibold text-[16px]">{item.title}</h1>
                <div className="flex flex-col gap-2">
                  {item.links.map((link, j) => (
                    <Link
                      key={j}
                      to={link.link}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((item, i) => (
              <div
                key={i}
                className={`${
                  BottomFooter.length - 1 === i
                    ? ""
                    : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                } px-3 text-center`}
              >
                <Link to={item === "Privacy Policy" ? "/" : item === "Cookie Policy" ? "/" : "/"}>
                  {item}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            Made with ❤️ StudyNotion © {new Date().getFullYear()} . All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}