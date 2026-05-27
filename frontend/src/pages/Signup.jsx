import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import SignupForm from "../components/Auth/SignupForm"
import Template from "../components/Auth/Template"
import signupImg from "../assets/Images/signup.jpg"

export default function Signup() {
  const { token } = useSelector((state) => state.auth)
  if (token) return <Navigate to="/dashboard/my-profile" />

  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
      Form={SignupForm}
    />
  )
}