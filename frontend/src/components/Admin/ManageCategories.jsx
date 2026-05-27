import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
  getAllCategoriesAdmin,
  createCategory,
  deleteCategory,
} from "../../services/operations/adminAPI"
import Spinner from "../common/Spinner"
import { FiTrash2 } from "react-icons/fi"

export default function ManageCategories() {
  const { token } = useSelector((state) => state.auth)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [creating, setCreating] = useState(false)

  const fetchCategories = async () => {
    const data = await getAllCategoriesAdmin(token)
    setCategories(data)
    setLoading(false)
  }

  useEffect(() => { fetchCategories() }, [])

  const handleCreate = async () => {
    if (!name.trim()) return
    setCreating(true)
    const success = await createCategory(name, description, token)
    if (success) {
      setName("")
      setDescription("")
      fetchCategories()
    }
    setCreating(false)
  }

  const handleDelete = async (categoryId) => {
    if (!window.confirm("Delete this category?")) return
    const success = await deleteCategory(categoryId, token)
    if (success) setCategories((prev) => prev.filter((c) => c._id !== categoryId))
  }

  if (loading) return <Spinner />

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-richblack-5">Manage Categories</h2>

      {/* Create form */}
      <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
        <p className="mb-4 font-semibold text-richblack-100">Add New Category</p>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name *"
            className="rounded-lg bg-richblack-700 px-4 py-2.5 text-sm text-richblack-5 placeholder:text-richblack-400 outline-none focus:ring-1 focus:ring-yellow-50"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="rounded-lg bg-richblack-700 px-4 py-2.5 text-sm text-richblack-5 placeholder:text-richblack-400 outline-none focus:ring-1 focus:ring-yellow-50"
          />
          <button
            onClick={handleCreate}
            disabled={creating || !name.trim()}
            className="self-start rounded-lg bg-yellow-50 px-6 py-2 text-sm font-semibold text-richblack-900 hover:bg-yellow-25 disabled:opacity-60 transition-all"
          >
            {creating ? "Creating..." : "Create Category"}
          </button>
        </div>
      </div>

      {/* Categories list */}
      <div className="overflow-hidden rounded-xl border border-richblack-700">
        <table className="w-full text-sm">
          <thead className="bg-richblack-700 text-richblack-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Courses</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-richblack-700">
            {categories.map((cat) => (
              <tr key={cat._id} className="bg-richblack-800 hover:bg-richblack-700 transition-colors">
                <td className="px-4 py-3 font-medium text-richblack-5">{cat.name}</td>
                <td className="px-4 py-3 text-richblack-300">
                  {cat.description || "—"}
                </td>
                <td className="px-4 py-3 text-richblack-300">
                  {cat.courses?.length ?? 0}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="rounded-lg p-2 text-pink-400 hover:bg-richblack-600 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <p className="py-10 text-center text-richblack-400">No categories found</p>
        )}
      </div>
    </div>
  )
}