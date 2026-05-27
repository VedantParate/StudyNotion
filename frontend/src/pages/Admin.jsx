import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/Admin/AdminSidebar"
import Navbar from "../components/common/Navbar"

export default function Admin() {
  return (
    <div className="flex min-h-screen flex-col bg-richblack-900 text-white">
      <Navbar />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}