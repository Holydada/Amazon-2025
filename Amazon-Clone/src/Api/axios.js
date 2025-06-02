import axios from "axios";
const axiosInstance = axios.create({
  //for localinstance of firebase
  // baseURL: "http://127.0.0.1:5001/clone-77a77/us-central1/api",

  //deployed version amazon server on render.com
  baseURL: " https://amazon-api-deploy-e7dv.onrender.com",
});
// named becase not to confuse withe file name axios
export {axiosInstance}