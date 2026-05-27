import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"
import toast from "react-hot-toast"

const { SEARCH_COURSES_API } = courseEndpoints

export async function searchCourses(query) {
  try {
    const response = await apiConnector("GET", SEARCH_COURSES_API, null, null, { query })
    if (!response.data.success) throw new Error(response.data.message)
    return response.data.data
  } catch (error) {
    console.error(error)
    return []
  }
}