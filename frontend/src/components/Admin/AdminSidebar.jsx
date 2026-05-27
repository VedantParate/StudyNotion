import { NavLink } from "react-router-dom"
import { RxDashboard } from "react-icons/rx"
import { FiUsers } from "react-icons/fi"
import { HiOutlineBookOpen } from "react-icons/hi"
import { BiCategory } from "react-icons/bi"
import { MdOutlinePayment } from "react-icons/md"

const links = [
  { to: "/admin",            icon: <RxDashboard />,       label: "Overview"   },
  { to: "/admin/users",      icon: <FiUsers />,           label: "Users"      },
  { to: "/admin/courses",    icon: <HiOutlineBookOpen />, label: "Courses"    },
  { to: "/admin/categories", icon: <BiCategory />,        label: "Categories" },
  { to: "/admin/payments",   icon: <MdOutlinePayment />,  label: "Payments"   },
]

export default function AdminSidebar() {
  return (
    <aside className="flex h-full w-56 flex-col border-r border-richblack-700 bg-richblack-800 py-8">
      <p className="mb-8 px-6 text-xl font-bold text-yellow-50">Admin Panel</p>
      <nav className="flex flex-col gap-1 px-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-yellow-800 text-yellow-50"
                  : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}