import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IoSearchOutline } from "react-icons/io5"

export default function SearchBar({ autoFocus = false }) {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 rounded-full border border-richblack-700 bg-richblack-800 px-4 py-2 focus-within:border-yellow-50 transition-all"
    >
      <IoSearchOutline className="text-xl text-richblack-400" />
      <input
        autoFocus={autoFocus}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search courses..."
        className="w-full bg-transparent text-sm text-richblack-5 placeholder:text-richblack-400 outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-yellow-50 px-4 py-1 text-sm font-semibold text-richblack-900 hover:bg-yellow-25 transition-all"
      >
        Search
      </button>
    </form>
  )
}