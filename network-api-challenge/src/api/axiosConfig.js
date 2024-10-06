import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://128.189.70.74:4000",
});

export default axiosInstance;