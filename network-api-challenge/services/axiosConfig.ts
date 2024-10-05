import axios from "axios";

const BACKEND_BASE_URL = "https://pplx.azurewebsites.net/api/rapid/v0"

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

export default axiosInstance;