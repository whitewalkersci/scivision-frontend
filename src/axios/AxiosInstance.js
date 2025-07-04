import axios from "axios";

const baseURL = "http://34.172.127.5:5000";

const AxiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  
});

export default AxiosInstance;
