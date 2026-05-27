import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getAllUsers, deleteUser } from "../../services/operations/adminAPI"
import Spinner from "../common/Spinner"
import { FiTrash2 } from "react-icons/fi"

export default function ManageUsers() {
  const { token } = useSelector((state) => state.auth)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")

  const fetchUsers = async () => {
    const data = await getAllUsers(token)
    setUsers(data)
    setLoading(false)
  }

  useEffect(() => { fetchUsers() }, [])

  const handleDelete = async (userId) => {
    if (!window.confirm("Delete this user?")) return
    const success = await deleteUser(userId, token)
    if (success) setUsers((prev) => prev.filter((u) => u._id !== userId))
  }

  const filtered =
    filter === "All" ? users : users.filter((u) => u.accountType === filter)

  if (loading) return <Spinner />

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-richblack-5">
          Manage Users
          <span className="ml-2 text-base font-normal text-richblack-400">
            ({users.length})
          </span>
        </h2>

        {/* Filter pills */}
        <div className="flex gap-2">
          {["All", "Student", "Instructor", "Admin"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                filter === type
                  ? "bg-yellow-50 text-richblack-900"
                  : "bg-richblack-700 text-richblack-200 hover:bg-richblack-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-richblack-700">
        <table className="w-full text-sm">
          <thead className="bg-richblack-700 text-richblack-100">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Joined</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-richblack-700">
            {filtered.map((user) => (
              <tr key={user._id} className="bg-richblack-800 hover:bg-richblack-700 transition-colors">
                <td className="flex items-center gap-3 px-4 py-3">
                  <img
                    src={user.image}
                    alt={user.firstName}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-richblack-5">
                    {user.firstName} {user.lastName}
                  </span>
                </td>
                <td className="px-4 py-3 text-richblack-300">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    user.accountType === "Admin"
                      ? "bg-pink-900 text-pink-200"
                      : user.accountType === "Instructor"
                      ? "bg-yellow-900 text-yellow-200"
                      : "bg-blue-900 text-blue-200"
                  }`}>
                    {user.accountType}
                  </span>
                </td>
                <td className="px-4 py-3 text-richblack-300">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="rounded-lg p-2 text-pink-400 hover:bg-richblack-600 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="py-10 text-center text-richblack-400">No users found</p>
        )}
      </div>
    </div>
  )
}