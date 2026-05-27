import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { ACCOUNT_TYPE } from "../../utils/constants"

export default function AdminRoute() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  if (!token) return <Navigate to="/login" />
  if (user?.accountType !== ACCOUNT_TYPE.ADMIN) return <Navigate to="/dashboard/my-profile" />
  return <Outlet />
}