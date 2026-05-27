// src/services/operations/contactAPI.js

import { toast }        from "react-hot-toast"
import { apiConnector } from "../apiConnector"

const BASE_URL = import.meta.env.VITE_APP_BASE_URL

const CONTACT_US_API = BASE_URL + "/reach/contact"

export async function contactUsAPI(data) {
  const toastId = toast.loading("Sending message...")
  try {
    const response = await apiConnector("POST", CONTACT_US_API, data)
    if (!response.data.success) throw new Error(response.data.message)
    toast.success("Message sent successfully")
    return response
  } catch (error) {
    toast.error(error.response?.data?.message || "Could not send message")
  } finally {
    toast.dismiss(toastId)
  }
}