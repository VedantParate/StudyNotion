// src/services/operations/instructorAPI.js

import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"

const { GET_INSTRUCTOR_DATA_API } = profileEndpoints

// ─── Get Instructor Dashboard Data ───────────────────────────────────────────
export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_INSTRUCTOR_DATA_API,
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (!response.data.success) throw new Error(response.data.message)
    result = response.data.data
  } catch (error) {
    toast.error("Could not load instructor data")
  }
  toast.dismiss(toastId)
  return result
}