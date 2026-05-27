// frontend/src/components/common/Navbar.jsx

import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { logout } from "../../services/operations/authAPI";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { IoSearchOutline } from "react-icons/io5";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile) ?? {};
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Point 10 — mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        if (res?.data?.data) setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch categories:", error);
      }
      setLoading(false);
    })();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  return (
    <div
      className={`relative flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        {/* ── Logo ───────────────────────────────────── */}
        <Link to="/">
          <img
            src={logo}
            alt="StudyNotion"
            width={160}
            height={32}
            loading="lazy"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* ── Nav Links (desktop) ─────────────────────── */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />

                    {/* Dropdown */}
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      {/* Arrow */}
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-45%] rotate-45 select-none rounded bg-richblack-5" />

                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks?.length ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            key={i}
                          >
                            {subLink.name}
                          </Link>
                        ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    {/* Point 6 — active underline */}
                    <p
                      className={`pb-0.5 transition-all duration-150 ${
                        matchRoute(link?.path)
                          ? "text-yellow-25 border-b-2 border-yellow-25"
                          : "text-richblack-25 border-b-2 border-transparent"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Right Side: Cart / Auth / Profile ───────── */}
        <div className="hidden items-center gap-x-4 md:flex">

          {/* Cart icon — only for Students */}
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {/* Point 7 — pulse animation on cart badge */}
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-yellow-50 text-center text-xs font-bold text-richblack-900 animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700 transition-all">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700 transition-all">
                Sign up
              </button>
            </Link>
          )}

          <button onClick={() => navigate("/search")}>
            <IoSearchOutline className="text-2xl text-richblack-100 hover:text-yellow-50 transition-colors" />
          </button>

          {token !== null && <ProfileDropdown />}
        </div>

        {/* ── Hamburger (mobile only) — Point 10 ──────── */}
        <button
          className="mr-4 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <AiOutlineClose fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>
      </div>

      {/* ── Mobile Dropdown Menu — Point 10 ────────────────────────────── */}
      {menuOpen && (
        <div className="absolute top-14 left-0 z-[999] w-full bg-richblack-800 border-t border-richblack-700 flex flex-col px-6 py-4 gap-4 md:hidden shadow-lg">

          {/* Nav links */}
          {NavbarLinks.map((link, index) => (
            <div key={index}>
              {link.title === "Catalog" ? (
                <div className="flex flex-col gap-2">
                  <p className="text-richblack-100 font-semibold">Catalog</p>
                  {subLinks.map((subLink, i) => (
                    <Link
                      key={i}
                      to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                      className="pl-4 text-sm text-richblack-300 hover:text-yellow-50 transition"
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  to={link?.path}
                  className={`text-base font-medium transition ${
                    matchRoute(link?.path)
                      ? "text-yellow-25"
                      : "text-richblack-100 hover:text-yellow-50"
                  }`}
                >
                  {link.title}
                </Link>
              )}
            </div>
          ))}

          {/* Divider */}
          <div className="border-t border-richblack-700 pt-3 flex flex-col gap-3">

            {/* Search */}
            <button
              onClick={() => navigate("/search")}
              className="flex items-center gap-2 text-richblack-100 hover:text-yellow-50 transition text-sm"
            >
              <IoSearchOutline className="text-xl" />
              Search
            </button>

            {/* Cart */}
            {user && user?.accountType !== "Instructor" && (
              <Link
                to="/dashboard/cart"
                className="flex items-center gap-2 text-richblack-100 hover:text-yellow-50 transition text-sm"
              >
                <AiOutlineShoppingCart className="text-xl" />
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
            )}

            {/* Login / Signup */}
            {token === null && (
              <div className="flex gap-3 mt-1">
                <Link to="/login" className="flex-1">
                  <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-700 px-4 py-2 text-richblack-100 hover:bg-richblack-600 transition text-sm">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <button className="w-full rounded-[8px] border border-yellow-50 bg-yellow-50 px-4 py-2 text-richblack-900 font-semibold hover:bg-yellow-25 transition text-sm">
                    Sign up
                  </button>
                </Link>
              </div>
            )}

            {/* Profile dropdown on mobile */}
            {token !== null && <ProfileDropdown />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
