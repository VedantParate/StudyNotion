// src/services/operations/courseOperationsAPI.js

import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

const {
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  DELETE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  CREATE_RATING_API,
} = courseEndpoints

// ─── Create Course ────────────────────────────────────────────────────────────
export async function createCourse(
  data,
  token
) {
  let result = null
  const toastId = toast.loading("Creating course...")
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization:  `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Course created successfully")
    result = response.data.data
  } catch (error) {
    toast.error(error.response?.data?.message || "Could not create course")
  }
  toast.dismiss(toastId)
  return result
}

// ─── Edit Course ──────────────────────────────────────────────────────────────
export async function editCourse(data, token) {
  let result = null
  const toastId = toast.loading("Updating course...")
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization:  `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Course updated successfully")
    result = response.data.data
  } catch (error) {
    toast.error(error.response?.data?.message || "Could not update course")
  }
  toast.dismiss(toastId)
  return result
}

// ─── Delete Course ────────────────────────────────────────────────────────────
export async function deleteCourse(data, token) {
  const toastId = toast.loading("Deleting course...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Course deleted successfully")
  } catch (error) {
    toast.error(error.response?.data?.message || "Could not delete course")
  }
  toast.dismiss(toastId)
}

// ─── Create Section ───────────────────────────────────────────────────────────
export async function createSection(data, token) {
  let result = null
  const toastId = toast.loading("Creating section...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Section created successfully")
    result = response.data.updatedCourse
  } catch (error) {
    toast.error(error.response?.data?.message || "Could not create section")
  }
  toast.dismiss(toastId)
  return result
}

// ─── Create SubSection ────────────────────────────────────────────────────────
export async function createSubSection(data, token) {
  let result = null
  const toastId = toast.loading("Creating lecture...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Lecture created successfully")
    result = response.data.data
  } catch (error) {
    toast.error(error.response?.data?.message || "Could not create lecture")
  }
  toast.dismiss(toastId)
  return result
}

// ─── Update Section ───────────────────────────────────────────────────────────
export async function updateSection(data, token) {
  let result = null
  const toastId = toast.loading("Updating section...")
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Section updated successfully")
    result = response.data.data
  } catch (error) {
    toast.error(error.response?.data?.message || "Could not update section")
  }
  toast.dismiss(toastId)
  return result
}

// ─── Update SubSection ────────────────────────────────────────────────────────
export async function updateSubSection(data, token) {
  let result = null
  const toastId = toast.loading("Updating lecture...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Lecture updated successfully")
    result = response.data.data
  } catch (error) {
    toast.error(error.response?.data?.message || "Could not update lecture")
  }
  toast.dismiss(toastId)
  return result
}

// ─── Delete Section ───────────────────────────────────────────────────────────
export async function deleteSection(data, token) {
  let result = null
  const toastId = toast.loading("Deleting section...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Section deleted successfully")
    result = response.data.data
  } catch (error) {
    toast.error(error.response?.data?.message || "Could not delete section")
  }
  toast.dismiss(toastId)
  return result
}

// ─── Delete SubSection ────────────────────────────────────────────────────────
export async function deleteSubSection(data, token) {
  let result = null
  const toastId = toast.loading("Deleting lecture...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Lecture deleted successfully")
    result = response.data.data
  } catch (error) {
    toast.error(error.response?.data?.message || "Could not delete lecture")
  }
  toast.dismiss(toastId)
  return result
}

// ─── Create Rating ────────────────────────────────────────────────────────────
export async function createRating(data, token) {
  const toastId = toast.loading("Submitting rating...")
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Rating submitted successfully")
  } catch (error) {
    toast.error(error.response?.data?.message || "Could not submit rating")
  }
  toast.dismiss(toastId)
}