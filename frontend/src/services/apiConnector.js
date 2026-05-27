// frontend/src/services/apiConnector.js
import axios from "axios"

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axios({
    method,
    url,
    data: bodyData,
    headers: headers ? headers : {},   // ← must pass headers like this
    params: params,
  })
}