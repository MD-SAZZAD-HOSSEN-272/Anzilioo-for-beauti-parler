

import axios from "axios";

/**
 * Axios instance factory (no auth system yet)
 */
const axiosSecure = () => {

    // console.log('call axios', process.env.NEXT_PUBLIC_API_URL)
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
  });

  /**
   * REQUEST INTERCEPTOR
   * (future-proof: logging / guestId / headers)
   */
  api.interceptors.request.use(
    (config) => {
      // console.log(
      //   `🚀 Request: ${config.method?.toUpperCase()} ${config.url}`
      // );

      // You can add guestId later here if needed
      if (typeof window !== "undefined") {
        const guestId = localStorage.getItem("guestId");

        if (guestId) {
          config.headers["x-guest-id"] = guestId;
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  /**
   * RESPONSE INTERCEPTOR
   */
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error(
        "❌ API Error:",
        error?.response?.data || error.message
      );

      return Promise.reject(error);
    }
  );

  return api;
};

export default axiosSecure;