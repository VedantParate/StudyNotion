import { ACCOUNT_TYPE } from "../utils/constants"

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
    type: "",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    icon: "VscDashboard",
    type: ACCOUNT_TYPE.INSTRUCTOR,
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    icon: "VscVm",
    type: ACCOUNT_TYPE.INSTRUCTOR,
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    icon: "VscAdd",
    type: ACCOUNT_TYPE.INSTRUCTOR,
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    icon: "VscMortarBoard",
    type: ACCOUNT_TYPE.STUDENT,
  },
  {
    id: 6,
    name: "My Wishlist",
    path: "/dashboard/wishlist",
    icon: "VscHeartFilled",
    type: ACCOUNT_TYPE.STUDENT,
  },
]