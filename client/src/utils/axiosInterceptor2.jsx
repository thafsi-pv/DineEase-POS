// axiosInterceptor.js
import axios from "axios";
import { store } from "../redux/store";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import { baseUrl } from "./const";

const axiosInstance2 = axios.create({
  baseURL: baseUrl,
});

axiosInstance2.interceptors.request.use(
  (config) => {
    store.dispatch(showLoader(true));
    const deData = JSON.parse(localStorage.getItem("DEPOS"));
    const authToken = deData.DET;
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance2.interceptors.response.use(
  (response) => {
    store.dispatch(hideLoader());
    return response;
  },
  (error) => {
    store.dispatch(hideLoader);
    return Promise.reject(error);
  }
);

export default axiosInstance2;
