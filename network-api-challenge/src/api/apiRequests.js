import axiosInstance from "./axiosConfig";

export const login = async (body) => {
  try {
    const response = await axiosInstance.post("/login", body);
    return response;
  } catch (e) {
    return e;
  }
}

export const register = async (body) => {

}

export const sendDocument = async (body) => {
  try {
    const response = await axiosInstance.post("/upload", body);
    return response;
  } catch (e) {
    return e;
  }
}