import axiosInstance from "./axiosConfig";

interface locationRequestBody {
  device: {
    phoneNumber: string,
  },
  area: {
    areaType: string,
    center: {
      latitude: number,
      longitude: number,
    },
    radius: number,
  },
  maxAge?: number
};

interface numberVerificationRequestBody {
  phoneNumber: string,
}

const verifyLocation = async (body: locationRequestBody) => {
  try {
    const response = await axiosInstance.post("/location-verification/verify", body);
    return response;
  } catch (e) {
    return;
  }
}

const verifyNumber = async (body: numberVerificationRequestBody) => {
  try {
    const response = await axiosInstance.post("/numberVerification/verify", body);
    return response;
  } catch (e) {
    return;
  }
}

const acquireAssociatedNumber = async () => {
  try {
    const response = await axiosInstance.get("/numberVerification/device-phone-number");
    return response;
  } catch (e) {
    return;
  }
}
