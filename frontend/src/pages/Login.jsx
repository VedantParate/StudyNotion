import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import LoginForm from "../components/Auth/LoginForm"
import Template from "../components/Auth/Template"
import loginImg from "../assets/Images/login.webp"

export default function Login() {
  const { token } = useSelector((state) => state.auth)
  if (token) return <Navigate to="/" />

  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={loginImg}
      formType="login"
      Form={LoginForm}
    />
  )
}