// src/services/operations/catalogAPI.js

import { toast }        from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { catalogData }  from "../apis"

const { CATALOGPAGEDATA_API } = catalogData

export async function getCatalogPageData(categoryId) {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "POST",
      CATALOGPAGEDATA_API,
      { categoryId }
    )
    if (!response?.data?.success)
      throw new Error("Could not fetch category page data")
    result = response?.data?.data
  } catch (error) {
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}