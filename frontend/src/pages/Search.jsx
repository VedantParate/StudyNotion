// frontend/src/pages/Search.jsx

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { searchCourses } from "../services/operations/searchAPI"
import SearchBar from "../components/Search/SearchBar"
import SearchResults from "../components/Search/SearchResults"
import Spinner from "../components/common/Spinner"
// ← Navbar and Footer removed

const CATEGORIES = ["All", "Web Dev", "Data Science", "AI/ML", "Design", "Business"]

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("q") || ""

  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    if (!query) return
    const fetchResults = async () => {
      setLoading(true)
      const data = await searchCourses(query)
      setResults(data)
      setLoading(false)
    }
    fetchResults()
  }, [query])

  const filtered =
    activeCategory === "All"
      ? results
      : results?.filter((c) => c.category?.name === activeCategory)

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 text-white">

      {/* Search bar */}
      <div className="mb-8 max-w-2xl">
        <SearchBar autoFocus />
      </div>

      {/* Query heading */}
      {query && (
        <p className="mb-6 text-richblack-300">
          Showing results for{" "}
          <span className="font-semibold text-richblack-5">"{query}"</span>
          {results && (
            <span className="ml-2 text-sm">({results.length} courses)</span>
          )}
        </p>
      )}

      {/* Category filter pills */}
      {results?.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-yellow-50 text-richblack-900"
                  : "bg-richblack-700 text-richblack-200 hover:bg-richblack-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {!query ? (
        <p className="py-20 text-center text-richblack-400">
          Type something above to search for courses
        </p>
      ) : loading ? (
        <Spinner />
      ) : (
        <SearchResults results={filtered} query={query} />
      )}

    </div>
  )
}