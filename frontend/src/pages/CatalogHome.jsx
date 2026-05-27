// frontend/src/pages/CatalogHome.jsx

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis"
import Spinner from "../components/Common/Spinner"

export default function CatalogHome() {
  const [allCategories, setAllCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API)
      setAllCategories(res?.data?.data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="mx-auto min-h-screen max-w-maxContent px-6 py-12 text-richblack-5">
      <h1 className="mb-2 text-3xl font-bold">All Categories</h1>
      <p className="mb-10 text-richblack-400">
        Choose a category to explore courses.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allCategories.map((cat) => (
          <Link
            key={cat._id}
            to={`/catalog/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="group rounded-xl bg-richblack-800 p-6 hover:bg-richblack-700 transition"
          >
            <p className="text-xl font-semibold text-richblack-5 group-hover:text-yellow-50 transition">
              {cat.name}
            </p>
            <p className="mt-2 text-sm text-richblack-400 line-clamp-2">
              {cat.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}