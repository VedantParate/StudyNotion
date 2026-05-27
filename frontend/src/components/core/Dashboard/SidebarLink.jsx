// src/components/core/Dashboard/SidebarLink.jsx

import { matchPath, NavLink, useLocation } from "react-router-dom"
import {
  VscAccount,
  VscSettingsGear,
  VscDashboard,
  VscVm,
  VscAdd,
  VscMortarBoard,
  VscHeartFilled,
} from "react-icons/vsc"

const IconMap = {
  VscAccount,
  VscSettingsGear,
  VscDashboard,
  VscVm,
  VscAdd,
  VscMortarBoard,
  VscHeartFilled,
}

export default function SidebarLink({ link, iconName }) {
  const Icon = IconMap[iconName]
  const location = useLocation()

  function matchRoute(route) {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium transition-all duration-200 ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50
                    transition-opacity duration-200 ${
                      matchRoute(link.path) ? "opacity-100" : "opacity-0"
                    }`}
      />
      <div className="flex items-center gap-x-2">
        {Icon && <Icon className="text-lg" />}
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}