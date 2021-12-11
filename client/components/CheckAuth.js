// import axios from "axios"
import { useAxios } from "../hooks/useAxios";

export const CheckAuth = async () => {
  const [axios] = useAxios()
  let response;

  try {
    response = await axios({method: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/check-auth", withCredentials: true})
  } catch (e) {
    // catch error
    throw new Error(e.message)
  }

  // if success return value
  return response.data.success
}