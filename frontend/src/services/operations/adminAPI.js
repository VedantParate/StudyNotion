import { apiConnector } from "../apiConnector"
import { adminEndpoints } from "../apis"
import toast from "react-hot-toast"

const {
  GET_ALL_USERS_API,
  DELETE_USER_API,
  GET_ALL_COURSES_API,
  DELETE_COURSE_API,
  GET_ALL_CATEGORIES_API,
  CREATE_CATEGORY_API,
  DELETE_CATEGORY_API,
  GET_ADMIN_STATS_API,
} = adminEndpoints

export async function getAllUsers(token) {
  try {
    const res = await apiConnector("GET", GET_ALL_USERS_API, null, {
      Authorization: `Bearer ${token}`,
    })
    if (!res.data.success) throw new Error(res.data.message)
    return res.data.data
  } catch (err) {
    toast.error("Could not fetch users")
    return []
  }
}

export async function deleteUser(userId, token) {
  try {
    const res = await apiConnector("DELETE", DELETE_USER_API, { userId }, {
      Authorization: `Bearer ${token}`,
    })
    if (!res.data.success) throw new Error(res.data.message)
    toast.success("User deleted")
    return true
  } catch (err) {
    toast.error("Could not delete user")
    return false
  }
}

export async function getAllCoursesAdmin(token) {
  try {
    const res = await apiConnector("GET", GET_ALL_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    })
    if (!res.data.success) throw new Error(res.data.message)
    return res.data.data
  } catch (err) {
    toast.error("Could not fetch courses")
    return []
  }
}

export async function deleteCourseAdmin(courseId, token) {
  try {
    const res = await apiConnector("DELETE", DELETE_COURSE_API, { courseId }, {
      Authorization: `Bearer ${token}`,
    })
    if (!res.data.success) throw new Error(res.data.message)
    toast.success("Course deleted")
    return true
  } catch (err) {
    toast.error("Could not delete course")
    return false
  }
}

export async function getAllCategoriesAdmin(token) {
  try {
    const res = await apiConnector("GET", GET_ALL_CATEGORIES_API, null, {
      Authorization: `Bearer ${token}`,
    })
    if (!res.data.success) throw new Error(res.data.message)
    return res.data.data
  } catch (err) {
    toast.error("Could not fetch categories")
    return []
  }
}

export async function createCategory(name, description, token) {
  try {
    const res = await apiConnector("POST", CREATE_CATEGORY_API, { name, description }, {
      Authorization: `Bearer ${token}`,
    })
    if (!res.data.success) throw new Error(res.data.message)
    toast.success("Category created")
    return true
  } catch (err) {
    toast.error("Could not create category")
    return false
  }
}

export async function deleteCategory(categoryId, token) {
  try {
    const res = await apiConnector("DELETE", DELETE_CATEGORY_API, { categoryId }, {
      Authorization: `Bearer ${token}`,
    })
    if (!res.data.success) throw new Error(res.data.message)
    toast.success("Category deleted")
    return true
  } catch (err) {
    toast.error("Could not delete category")
    return false
  }
}

export async function getAdminStats(token) {
  try {
    const res = await apiConnector("GET", GET_ADMIN_STATS_API, null, {
      Authorization: `Bearer ${token}`,
    })
    if (!res.data.success) throw new Error(res.data.message)
    return res.data.data
  } catch (err) {
    console.error(err)
    return null
  }
}