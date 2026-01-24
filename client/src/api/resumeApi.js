import axios from "./axiosInstance";

export const analyzeResume = (formData) => {
  return axios.post("/analysis", formData);
};
