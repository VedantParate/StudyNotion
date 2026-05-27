// frontend/src/services/operations/courseDetailsAPI.js

import { courseEndpoints, studentEndpoints } from "../apis"
import { apiConnector } from "../apiConnector"
import toast from "react-hot-toast"


const { 
  GET_INSTRUCTOR_COURSES_API, 
  GET_COURSE_DETAILS_API,
  CREATE_RATING_API,
  CREATE_CATEGORY_API
} = courseEndpoints

const { 
  GET_FULL_COURSE_DETAILS_AUTHENTICATED, 
  LECTURE_COMPLETION_API 
} = studentEndpoints

export async function getCourseDetails(courseId) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", GET_COURSE_DETAILS_API, { courseId })
    if (!response.data.success) throw new Error(response.data.message)
    return response.data.data
  } catch (error) {
    toast.error("Could not fetch course details")
    console.error(error)
  } finally {
    toast.dismiss(toastId)
  }
}

export async function getInstructorCourses(token) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    return response.data.data
  } catch (error) {
    toast.error("Could not fetch instructor courses")
    console.error(error)
    return []
  } finally {
    toast.dismiss(toastId)
  }
}

export async function getFullDetailsOfCourse(courseId, token) {
  const toastId = toast.loading("Loading course...")
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      { Authorization: `Bearer ${token}` }
    )
    if (!response.data.success) throw new Error(response.data.message)
    return response.data.data
  } catch (error) {
    toast.error("Could not load course details")
    console.error(error)
  } finally {
    toast.dismiss(toastId)
  }
}

export async function markLectureAsComplete(data, token) {
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Lecture marked as complete!")
    return true
  } catch (error) {
    toast.error("Could not update progress")
    console.error(error)
    return false
  }
}

// ✅ ADD THIS FUNCTION
export async function createRating(data, token) {
  const toastId = toast.loading("Submitting review...")
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Review submitted successfully!")
    return response.data.data
  } catch (error) {
    toast.error("Could not submit review")
    console.error(error)
  } finally {
    toast.dismiss(toastId)
  }
}

export async function createCategory(data, token) {

  const toastId = toast.loading("Creating Category...");

  try {

    const response = await apiConnector(
      "POST",
      CREATE_CATEGORY_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Category Created Successfully");

    return response.data.data;

  } catch (error) {

    console.log(error);

    toast.error(
      error?.response?.data?.message || "Could not create category"
    );

  } finally {

    toast.dismiss(toastId);
  }
}