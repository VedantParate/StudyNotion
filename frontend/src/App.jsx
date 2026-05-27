// src/App.jsx

import { Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Home                from "./pages/Home"
import Login               from "./pages/Login"
import Signup              from "./pages/Signup"
import VerifyEmail         from "./pages/VerifyEmail"
import ForgotPassword      from "./pages/ForgotPassword"
import UpdatePassword      from "./pages/UpdatePassword"
import About               from "./pages/About"
import Contact             from "./pages/Contact"
import Catalog             from "./pages/Catalog"
import CourseDetails       from "./pages/CourseDetails"
import Dashboard           from "./pages/Dashboard"
import Error               from "./pages/Error"
import PrivateRoute        from "./components/core/Auth/PrivateRoute"
import MyProfile           from "./components/core/Dashboard/MyProfile"
import EnrolledCourses     from "./components/core/Dashboard/EnrolledCourses"
import Settings            from "./components/core/Dashboard/Settings/index"
import Cart                from "./components/core/Dashboard/cart/index"
import AddCourse           from "./components/core/Dashboard/AddCourse/index"
import EditCourse          from "./components/core/Dashboard/EditCourse"
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/index"
import MyCourses           from "./components/core/Dashboard/MyCourses"
import Navbar              from "./components/common/Navbar"
import Footer              from "./components/common/Footer"
import ViewCourse          from "./pages/ViewCourse"
import VideoDetails        from "./components/ViewCourse/VideoDetails"
import Search              from "./pages/Search"
import Admin               from "./pages/Admin"
import AdminRoute          from "./components/Auth/AdminRoute"
import AdminStats          from "./components/Admin/AdminStats"
import ManageUsers         from "./components/Admin/ManageUsers"
import ManageCourses       from "./components/Admin/ManageCourses"
import ManageCategories    from "./components/Admin/ManageCategories"
import PendingEnrollments  from "./components/Admin/PendingEnrollments"
import CatalogHome         from "./pages/CatalogHome"
import AddCategory         from "./pages/AddCategory";

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-richblack-900 font-inter overflow-x-hidden">
      <Navbar />
      <Routes>

      {/* <Route path="/catalog" element={<Navigate to="/" replace />} /> */}
      
      // App.jsx — add this route:
<Route path="/catalog" element={<CatalogHome />} />
<Route path="/catalog/:catalogName" element={<Catalog />} />

        {/* Public Routes */}
        <Route path="/"                     element={<Home />} />
        <Route path="/login"                element={<Login />} />
        <Route path="/signup"               element={<Signup />} />
        <Route path="/verify-email"         element={<VerifyEmail />} />
        <Route path="/forgot-password"      element={<ForgotPassword />} />
        <Route path="/update-password/:id"  element={<UpdatePassword />} />
        <Route path="/about"                element={<About />} />
        <Route path="/contact"              element={<Contact />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId"    element={<CourseDetails />} />
        <Route path="/search"               element={<Search />} />
        <Route path="/add-category"         element={<AddCategory />} />
        
        

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="my-profile"            element={<MyProfile />} />
            <Route path="settings"              element={<Settings />} />
            <Route path="cart"                  element={<Cart />} />
            <Route path="enrolled-courses"      element={<EnrolledCourses />} />
            <Route path="add-course"            element={<AddCourse />} />
            <Route path="my-courses"            element={<MyCourses />} />
            <Route path="edit-course/:courseId" element={<EditCourse />} />
            <Route path="instructor"            element={<InstructorDashboard />} />
            <Route path="payments"              element={<PendingEnrollments />} />
            <Route path="wishlist" element={<Navigate to="../cart" replace />} />
            
          </Route>

          {/* View Course */}
          <Route path="/view-course/:courseId" element={<ViewCourse />}>
            <Route
              path="section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails />}
            />
          </Route>

          {/* Admin */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />}>
              <Route index           element={<AdminStats />} />
              <Route path="users"      element={<ManageUsers />} />
              <Route path="courses"    element={<ManageCourses />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="payments"   element={<PendingEnrollments />} />
            </Route>
          </Route>

        </Route>

        {/* 404 */}
        <Route path="*" element={<Error />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App