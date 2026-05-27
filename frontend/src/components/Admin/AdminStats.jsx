import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getAdminStats } from "../../services/operations/adminAPI"
import { FiUsers } from "react-icons/fi"
import { HiOutlineBookOpen } from "react-icons/hi"
import { BiCategory } from "react-icons/bi"
import { MdOutlineAttachMoney } from "react-icons/md"
import Spinner from "../common/Spinner"

const StatCard = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-4 rounded-xl border border-richblack-700 bg-richblack-800 p-6">
    <div className={`rounded-full p-3 ${color}`}>
      <span className="text-2xl text-white">{icon}</span>
    </div>
    <div>
      <p className="text-2xl font-bold text-richblack-5">{value ?? "—"}</p>
      <p className="text-sm text-richblack-400">{label}</p>
    </div>
  </div>
)

export default function AdminStats() {
  const { token } = useSelector((state) => state.auth)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAdminStats(token).then((data) => {
      setStats(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-richblack-5">Overview</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={<FiUsers />}               label="Total Users"    value={stats?.totalUsers}    color="bg-blue-600"   />
        <StatCard icon={<HiOutlineBookOpen />}      label="Total Courses"  value={stats?.totalCourses}  color="bg-yellow-600" />
        <StatCard icon={<BiCategory />}             label="Categories"     value={stats?.totalCategories} color="bg-green-600" />
        <StatCard icon={<MdOutlineAttachMoney />}   label="Total Revenue"  value={stats?.totalRevenue ? `₹${stats.totalRevenue}` : "₹0"} color="bg-pink-600" />
      </div>
    </div>
  )
}
