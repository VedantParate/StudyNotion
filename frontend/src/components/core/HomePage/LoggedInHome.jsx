// src/components/core/HomePage/LoggedInHome.jsx

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { FiPlay, FiBookOpen, FiTrendingUp, FiUser, FiShoppingCart } from "react-icons/fi"
import { apiConnector } from "../../../services/apiConnector"
import { profileEndpoints, categories, courseEndpoints } from "../../../services/apis"

// ─── Point 8: Skeleton loader sub-components ──────────────────────────────────

const SkeletonCard = () => (
  <div className="rounded-xl overflow-hidden border border-richblack-700 bg-richblack-800 animate-pulse">
    <div className="h-44 bg-richblack-700" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-richblack-600 rounded w-3/4" />
      <div className="h-3 bg-richblack-600 rounded w-1/2" />
      <div className="h-3 bg-richblack-600 rounded w-1/3" />
    </div>
  </div>
)

const SkeletonBanner = () => (
  <div className="bg-richblack-800 border-b border-richblack-700 px-6 py-10 animate-pulse">
    <div className="mx-auto max-w-maxContent flex items-center justify-between flex-wrap gap-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-richblack-600 hidden sm:block" />
        <div className="space-y-2">
          <div className="h-6 bg-richblack-600 rounded w-48" />
          <div className="h-4 bg-richblack-600 rounded w-64" />
        </div>
      </div>
      <div className="flex gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg bg-richblack-700 px-5 py-3 min-w-[80px] space-y-2">
            <div className="h-6 bg-richblack-600 rounded mx-auto w-8" />
            <div className="h-3 bg-richblack-600 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
)

// ─── Main Component ────────────────────────────────────────────────────────────

const LoggedInHome = () => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.accountType?.toLowerCase() === "instructor") {
      navigate("/dashboard/instructor")
    }
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enrollRes = await apiConnector(
          "GET",
          profileEndpoints.GET_USER_ENROLLED_COURSES_API,
          null,
          { Authorization: `Bearer ${token}` }
        )
        setEnrolledCourses(enrollRes?.data?.data || [])

        const courseRes = await apiConnector(
          "GET",
          courseEndpoints.GET_ALL_COURSE_API
        )
        setAllCourses(courseRes?.data?.data || [])

        const catRes = await apiConnector(
          "GET",
          categories.CATEGORIES_API
        )
        setAllCategories(catRes?.data?.data || [])

      } catch (err) {
        console.error("LoggedInHome fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [token])

  const enrolledIds = enrolledCourses.map((c) => c._id)

  const inProgress = enrolledCourses.filter(
    (c) => c.progressPercentage > 0 && c.progressPercentage < 100
  )
  const notStarted = enrolledCourses.filter(
    (c) => !c.progressPercentage || c.progressPercentage === 0
  )
  const completed = enrolledCourses.filter(
    (c) => c.progressPercentage === 100
  )

  const availableCourses =
    activeCategory === "All"
      ? allCourses
      : allCourses.filter((c) => {
          const matchedCat = allCategories.find(
            (cat) => cat.name === activeCategory
          )
          return (
            c?.category === matchedCat?._id ||
            c?.category?._id === matchedCat?._id ||
            c?.category?.name === activeCategory
          )
        })

  // ─── Point 8: Skeleton while loading ──────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 text-richblack-5">
        <SkeletonBanner />
        <div className="mx-auto max-w-maxContent px-6 py-10 space-y-12">
          <section>
            <div className="h-6 bg-richblack-700 rounded w-48 mb-5 animate-pulse" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
            </div>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">

      {/* ── Welcome Banner ── */}
      <div className="bg-gradient-to-r from-richblack-800 to-richblack-700 border-b border-richblack-700 px-6 py-10">
        <div className="mx-auto max-w-maxContent flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-4">

            {/* Point 1 — User avatar in banner */}
            <img
              src={user?.image}
              alt="avatar"
              className="w-14 h-14 rounded-full object-cover border-2 border-yellow-50 hidden sm:block flex-shrink-0"
            />

            <div>
              <h1 className="text-3xl font-bold text-richblack-5">
                Welcome back,{" "}
                <span className="text-yellow-50">{user?.firstName}! 👋</span>
              </h1>
              <p className="mt-1 text-richblack-300 text-sm">
                {inProgress.length > 0
                  ? `You have ${inProgress.length} course${inProgress.length > 1 ? "s" : ""} in progress — keep it up!`
                  : enrolledCourses.length === 0
                  ? "You haven't enrolled in any course yet. Start today!"
                  : "Great job! All your courses are either complete or ready to start."}
              </p>
            </div>
          </div>

          {/* Point 2 — Clickable stats pills */}
          <div className="flex gap-4">
            <Link to="/dashboard/enrolled-courses">
              <StatPill label="Enrolled" value={enrolledCourses.length} />
            </Link>
            <Link to="/dashboard/enrolled-courses">
              <StatPill label="In Progress" value={inProgress.length} />
            </Link>
            <Link to="/dashboard/enrolled-courses">
              <StatPill label="Completed" value={completed.length} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="mx-auto max-w-maxContent px-6 py-10 space-y-12">

        {/* ── Continue Learning ── */}
        {inProgress.length > 0 && (
          <Section title="Continue Learning" icon={<FiPlay />}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {inProgress.map((course) => (
                <ProgressCourseCard key={course._id} course={course} />
              ))}
            </div>
          </Section>
        )}

        {/* ── My Courses Not Started ── */}
        {notStarted.length > 0 && (
          <Section title="My Courses" icon={<FiBookOpen />}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {notStarted.map((course) => (
                <SimpleCourseCard
                  key={course._id}
                  course={course}
                  label="Start Learning"
                />
              ))}
            </div>
          </Section>
        )}

        {/* ── Completed Courses ── */}
        {completed.length > 0 && (
          <Section title="Completed Courses" icon={<FiBookOpen />}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {completed.map((course) => (
                <SimpleCourseCard
                  key={course._id}
                  course={course}
                  label="✅ Completed"
                />
              ))}
            </div>
          </Section>
        )}

        {/* ── Empty State ── */}
        {enrolledCourses.length === 0 && (
          <div className="rounded-xl bg-richblack-800 p-12 text-center">
            <p className="text-2xl font-semibold text-richblack-100">
              No courses yet
            </p>
            <p className="mt-2 text-richblack-400">
              Browse our catalog and start learning something amazing today.
            </p>
            {allCategories.length > 0 ? (
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {allCategories.map((cat) => (
                  <Link
                    key={cat._id}
                    to={`/catalog/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-lg bg-yellow-50 px-5 py-2 font-bold text-richblack-900 hover:bg-yellow-25 transition"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-richblack-400 text-sm">
                Loading categories...
              </p>
            )}
          </div>
        )}

        {/* ── All Available Courses ── */}
        <Section title="All Available Courses" icon={<FiShoppingCart />}>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveCategory("All")}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                activeCategory === "All"
                  ? "bg-yellow-50 text-richblack-900"
                  : "border border-richblack-600 text-richblack-300 hover:border-yellow-50 hover:text-yellow-50"
              }`}
            >
              All
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat.name)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                  activeCategory === cat.name
                    ? "bg-yellow-50 text-richblack-900"
                    : "border border-richblack-600 text-richblack-300 hover:border-yellow-50 hover:text-yellow-50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          {availableCourses.length === 0 ? (
            <p className="text-richblack-400 text-center py-10">
              No courses available in this category yet.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {availableCourses.map((course) => (
                <BrowseCourseCard
                  key={course._id}
                  course={course}
                  enrolled={enrolledIds.includes(course._id)}
                  navigate={navigate}
                  allCategories={allCategories}
                />
              ))}
            </div>
          )}
        </Section>

        {/* ── Browse by Category ── */}
        {allCategories.length > 0 && (
          <Section title="Browse by Category" icon={<FiTrendingUp />}>
            <div className="flex flex-wrap gap-3">
              {allCategories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/catalog/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-full border border-richblack-600 bg-richblack-800 px-5 py-2 text-sm text-richblack-200 hover:border-yellow-50 hover:text-yellow-50 transition"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* ── Quick Actions ── */}
        <Section title="Quick Actions" icon={<FiUser />}>
          <div className="grid gap-4 sm:grid-cols-3">
            <QuickLink
              to="/dashboard/enrolled-courses"
              icon={<FiBookOpen />}
              label="My Enrolled Courses"
            />
            <QuickLink
              to="/catalog"
              icon={<FiTrendingUp />}
              label="Explore Catalog"
            />
            <QuickLink
              to="/dashboard/my-profile"
              icon={<FiUser />}
              label="My Profile"
            />
          </div>
        </Section>

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */

const Section = ({ title, icon, children }) => (
  <section>
    <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-richblack-5 border-b border-richblack-700 pb-2">
      <span className="text-yellow-50">{icon}</span>
      {title}
    </h2>
    {children}
  </section>
)

// Point 2 — StatPill now wrapped in Link by parent, add hover effect
const StatPill = ({ label, value }) => (
  <div className="rounded-lg bg-richblack-700 px-5 py-3 text-center min-w-[80px] hover:bg-richblack-600 hover:ring-1 hover:ring-yellow-50 transition-all duration-200 cursor-pointer">
    <p className="text-2xl font-bold text-yellow-50">{value}</p>
    <p className="text-xs text-richblack-300">{label}</p>
  </div>
)

// Point 3 — BrowseCourseCard now shows category badge on thumbnail
const BrowseCourseCard = ({ course, enrolled, navigate, allCategories }) => {
  const avgRating =
    course.ratingAndReviews?.length
      ? (
          course.ratingAndReviews.reduce((sum, r) => sum + r.rating, 0) /
          course.ratingAndReviews.length
        ).toFixed(1)
      : null

  const firstSection = course.courseContent?.[0]
  const firstSub = firstSection?.subSection?.[0]
  const continueLink =
    firstSection && firstSub
      ? `/view-course/${course._id}/section/${firstSection._id}/sub-section/${firstSub._id}`
      : `/courses/${course._id}`

  // Resolve category name from allCategories if category is just an ID
  const categoryName =
    course.category?.name ||
    allCategories.find((cat) => cat._id === course.category)?.name ||
    null

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-richblack-700 bg-richblack-800 hover:border-yellow-50 transition-all hover:-translate-y-1 hover:shadow-lg duration-200">

      {/* Thumbnail */}
      <div className="relative h-44 bg-richblack-700">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-richblack-400 text-sm">
            No Thumbnail
          </div>
        )}

        {/* Point 3 — Category badge on top-left */}
        {categoryName && (
          <span className="absolute top-2 left-2 bg-richblack-900/80 text-yellow-50 text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
            {categoryName}
          </span>
        )}

        {/* Enrolled badge on top-right */}
        {enrolled && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-richblack-900 text-xs font-bold px-2 py-0.5 rounded-full">
            Enrolled ✓
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 gap-1">
        <h3 className="text-richblack-5 font-semibold text-sm leading-snug line-clamp-2">
          {course.courseName}
        </h3>

        <p className="text-richblack-400 text-xs">
          {course.instructor?.firstName} {course.instructor?.lastName}
        </p>

        {avgRating && (
          <div className="flex items-center gap-1 text-xs mt-1">
            <span className="text-yellow-400 font-bold">{avgRating} ★</span>
            <span className="text-richblack-400">
              ({course.ratingAndReviews.length} reviews)
            </span>
          </div>
        )}

        <p className="text-richblack-400 text-xs">
          {course.studentsEnrolled?.length || 0} students enrolled
        </p>

        {/* Price and Action Button */}
        <div className="mt-auto pt-3 border-t border-richblack-700 flex items-center justify-between">
          <span className="text-yellow-400 font-bold text-base">
            {course.price === 0 ? "Free" : `₹${course.price}`}
          </span>

          {enrolled ? (
            <button
              onClick={() => navigate(continueLink)}
              className="rounded-lg bg-yellow-50 px-3 py-1.5 text-xs font-bold text-richblack-900 hover:bg-yellow-25 transition-all"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={() => navigate(`/courses/${course._id}`)}
              className="rounded-lg bg-richblack-600 px-3 py-1.5 text-xs font-bold text-richblack-100 hover:bg-yellow-50 hover:text-richblack-900 transition-all"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const ProgressCourseCard = ({ course }) => {
  const firstSection = course.courseContent?.[0]
  const firstSub = firstSection?.subSection?.[0]
  const link =
    firstSection && firstSub
      ? `/view-course/${course._id}/section/${firstSection._id}/sub-section/${firstSub._id}`
      : `/courses/${course._id}`

  return (
    <Link
      to={link}
      className="group rounded-xl overflow-hidden bg-richblack-800 hover:bg-richblack-700 transition"
    >
      <img
        src={course.thumbnail}
        alt={course.courseName}
        className="h-36 w-full object-cover"
      />
      <div className="p-4">
        <p className="font-semibold text-richblack-5 line-clamp-2 group-hover:text-yellow-50 transition">
          {course.courseName}
        </p>
        <p className="text-xs text-richblack-400 mt-1">
          {course.instructor?.firstName} {course.instructor?.lastName}
        </p>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-richblack-400 mb-1">
            <span>Progress</span>
            <span>{Math.round(course.progressPercentage)}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-richblack-600">
            <div
              className="h-1.5 rounded-full bg-yellow-50 transition-all duration-300"
              style={{ width: `${course.progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

const SimpleCourseCard = ({ course, label }) => (
  <Link
    to={`/courses/${course._id}`}
    className="group rounded-xl overflow-hidden bg-richblack-800 hover:bg-richblack-700 transition"
  >
    <img
      src={course.thumbnail}
      alt={course.courseName}
      className="h-32 w-full object-cover"
    />
    <div className="p-3">
      <p className="text-sm font-semibold text-richblack-100 line-clamp-2 group-hover:text-yellow-50 transition">
        {course.courseName}
      </p>
      <p className="mt-1 text-xs text-richblack-400">{label}</p>
    </div>
  </Link>
)

const QuickLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 rounded-xl bg-richblack-800 px-5 py-4 text-richblack-200 hover:bg-richblack-700 hover:text-yellow-50 transition"
  >
    <span className="text-xl text-yellow-50">{icon}</span>
    <span className="font-medium">{label}</span>
  </Link>
)

export default LoggedInHome
