// src/services/apis.js

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const endpoints = {
  SENDOTP_API:        BASE_URL + "/auth/sendotp",
  SIGNUP_API:         BASE_URL + "/auth/signup",
  LOGIN_API:          BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API:  BASE_URL + "/auth/reset-password",
  GOOGLE_LOGIN_API:   BASE_URL + "/auth/google-login",   // ← ADD THIS
};

// ─── Categories ───────────────────────────────────────────────────────────────
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

// ─── Catalog ──────────────────────────────────────────────────────────────────
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
};

// ─── Course ───────────────────────────────────────────────────────────────────
export const courseEndpoints = {
  GET_ALL_COURSE_API:             BASE_URL + "/course/getAllCourses",       // ✅ used in LoggedInHome
  GET_COURSE_DETAILS_API:         BASE_URL + "/course/getCourseDetails",
  COURSE_INSTRUCTOR_API:          BASE_URL + "/course/instructor-courses",
  COURSE_CATEGORIES_API:          BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API:              BASE_URL + "/course/createCourse",
  EDIT_COURSE_API:                BASE_URL + "/course/editCourse",
  DELETE_COURSE_API:              BASE_URL + "/course/deleteCourse",
  CREATE_SECTION_API:             BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API:          BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API:             BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API:          BASE_URL + "/course/updateSubSection",
  DELETE_SECTION_API:             BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API:          BASE_URL + "/course/deleteSubSection",
  GET_INSTRUCTOR_COURSES_API:     BASE_URL + "/course/getInstructorCourses",
  CREATE_RATING_API:              BASE_URL + "/course/createRating",
  GET_REVIEWS_API:                BASE_URL + "/course/getReviews",
  SEARCH_COURSES_API:             BASE_URL + "/course/searchCourse",
  CREATE_CATEGORY_API:            BASE_URL + "/course/createCategory",
};

// ─── Student (Payment & Enrollment) ───────────────────────────────────────────
export const studentEndpoints = {
  COURSE_PAYMENT_API:                    BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API:                     BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API:        BASE_URL + "/payment/sendPaymentSuccessEmail",
  GET_ENROLLED_COURSES_API:              BASE_URL + "/profile/getEnrolledCourses",
  GET_COURSE_PROGRESS_API:               BASE_URL + "/courseProgress/getCourseProgress",
  UPDATE_COURSE_PROGRESS_API:            BASE_URL + "/courseProgress/updateCourseProgress",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API:                BASE_URL + "/course/updateCourseProgress",
  UPI_PAYMENT_SUBMIT_API:                BASE_URL + "/payment/upiSubmit",
};

// ─── Profile ──────────────────────────────────────────────────────────────────
export const profileEndpoints = {
  GET_USER_DETAILS_API:          BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API:       BASE_URL + "/profile/instructorDashboard",
  UPDATE_DISPLAY_PICTURE_API:    BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API:            BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API:           BASE_URL + "/auth/changePassword",
  DELETE_PROFILE_API:            BASE_URL + "/profile/deleteProfile",
};

// ─── Ratings & Reviews ────────────────────────────────────────────────────────
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
};

// ─── Admin ────────────────────────────────────────────────────────────────────
export const adminEndpoints = {
  GET_PENDING_PAYMENTS_API: BASE_URL + "/admin/pendingPayments",
  VERIFY_UPI_PAYMENT_API:   BASE_URL + "/payment/upiVerify",
  REJECT_UPI_PAYMENT_API:   BASE_URL + "/payment/upiReject",
};