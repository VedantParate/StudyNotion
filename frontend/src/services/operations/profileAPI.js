// src/services/operations/profileAPI.js

import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { setLoading } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"

const {
  GET_USER_DETAILS_API,
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = profileEndpoints

// ─── Get User Details ─────────────────────────────────────────────────────────
export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      if (!response.data.success) throw new Error(response.data.message)
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(setLoading(false))
      toast.error("Could not get user details")
      navigate("/login")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

// ─── Update Display Picture ───────────────────────────────────────────────────
export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Uploading photo...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      if (!response.data.success) throw new Error(response.data.message)
      toast.success("Profile photo updated")
      dispatch(setUser(response.data.data))
      localStorage.setItem("user", JSON.stringify(response.data.data))
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update photo")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

// ─── Update Profile ───────────────────────────────────────────────────────────
export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      if (!response.data.success) throw new Error(response.data.message)
      const userImage = response.data.updatedUser.image
        ? response.data.updatedUser.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUser.firstName} ${response.data.updatedUser.lastName}`
      dispatch(setUser({ ...response.data.updatedUser, image: userImage }))
      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.updatedUser, image: userImage })
      )
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update profile")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

// ─── Change Password ──────────────────────────────────────────────────────────
export function changePassword(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating password...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector(
        "POST",
        CHANGE_PASSWORD_API,
        formData,
        { Authorization: `Bearer ${token}` }
      )
      if (!response.data.success) throw new Error(response.data.message)
      toast.success("Password changed successfully")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not change password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

// ─── Delete Account ───────────────────────────────────────────────────────────
export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting account...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      if (!response.data.success) throw new Error(response.data.message)
      toast.success("Account deleted successfully")
      dispatch(setUser(null))
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete account")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}