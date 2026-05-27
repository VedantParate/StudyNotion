// src/pages/Catalog.jsx

import { useEffect, useState } from "react"
import { useParams }           from "react-router-dom"
import { useSelector }         from "react-redux"
import { apiConnector }        from "../services/apiConnector"
import { categories }          from "../services/apis"
import { getCatalogPageData }  from "../services/operations/catalogAPI"
import CourseSlider            from "../components/core/Catalog/CourseSlider"
import CourseCardTwo           from "../components/core/Catalog/CourseCardTwo"
import Spinner                 from "../components/common/Spinner"
import Footer                  from "../components/common/Footer"

const { CATEGORIES_API } = categories

export default function Catalog() {
  const { catalogName }  = useParams()
  const { token }        = useSelector((state) => state.auth)

  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId,      setCategoryId]      = useState(null)
  const [loading,         setLoading]         = useState(false)
  const [activeTab,       setActiveTab]       = useState("mostPopular")

  // ── Step 1: get category id from catalogName ───────────────────────────
  useEffect(() => {
    async function getCategories() {
      const res = await apiConnector("GET", CATEGORIES_API)
      const allCategories = res?.data?.data

      const matchedCategory = allCategories?.find(
        (cat) =>
          cat.name.split(" ").join("-").toLowerCase() === catalogName
      )
      if (matchedCategory) setCategoryId(matchedCategory._id)
    }
    getCategories()
  }, [catalogName])

  // ── Step 2: fetch catalog page data once we have the category id ────────
  useEffect(() => {
    if (!categoryId) return
    async function fetchData() {
      setLoading(true)
      const result = await getCatalogPageData(categoryId)
      setCatalogPageData(result)
      setLoading(false)
    }
    fetchData()
  }, [categoryId])

  if (loading) return <Spinner />

  if (!catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center
                      text-richblack-5">
        <p>Category not found</p>
      </div>
    )
  }

  return (
    <div className="text-richblack-5">

      {/* ─── Hero Section ────────────────────────────────────────────── */}
      <div className="box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContent
                        flex-col justify-center gap-4 py-12">

          {/* Breadcrumb */}
          <p className="text-sm text-richblack-300">
            Home / Catalog /{" "}
            <span className="text-yellow-25">
              {catalogPageData?.selectedCategory?.name}
            </span>
          </p>

          {/* Category name */}
          <p className="text-3xl font-bold text-richblack-5">
            {catalogPageData?.selectedCategory?.name}
          </p>

          {/* Description */}
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.selectedCategory?.description}
          </p>

        </div>
      </div>

      {/* ─── Body ────────────────────────────────────────────────────── */}
      <div className="mx-auto box-content w-full max-w-maxContent
                      px-4 py-12">

        {/* ── Section 1: Courses to get started ─────────────────────── */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">
            Courses to get you started
          </h2>

          {/* Tabs */}
          <div className="my-4 flex border-b border-b-richblack-600 text-sm">
            <button
              onClick={() => setActiveTab("mostPopular")}
              className={`px-4 py-2 ${
                activeTab === "mostPopular"
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
              }`}
            >
              Most Popular
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 ${
                activeTab === "new"
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
              }`}
            >
              New
            </button>
          </div>

          {/* Slider */}
          <CourseSlider
            courses={
              activeTab === "mostPopular"
                ? catalogPageData?.mostSellingCourses
                : catalogPageData?.selectedCategory?.courses
            }
          />
        </div>

        {/* ── Section 2: Top courses in this category ────────────────── */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">
            Top courses in{" "}
            {catalogPageData?.selectedCategory?.name}
          </h2>
          <CourseSlider
            courses={catalogPageData?.selectedCategory?.courses}
          />
        </div>

        {/* ── Section 3: Frequently bought together ─────────────────── */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">
            Frequently Bought Together
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catalogPageData?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, index) => (
                <CourseCardTwo key={index} course={course} />
              ))}
          </div>
        </div>

      </div>

    </div>
  )
}