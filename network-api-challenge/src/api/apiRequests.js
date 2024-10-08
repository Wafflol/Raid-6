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
  try {
    const response = await axiosInstance.post('/register', body);
    return true;
  } catch (e) {
    return false;
  }
}

export const sendDocument = async (body) => {
  try {
    await axiosInstance.post("/upload", body);
    return true;
  } catch (e) {
    return false;
  }
}

export const verifySignature = async (body) => {
  try {
    const response = await axiosInstance.post("/location", body);
    return response;
  } catch (e) {
    return false;
  }
}