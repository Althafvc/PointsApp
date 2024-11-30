// Api.js
import axios from 'axios';

const BASEURL = "https://pointsapp-backend-new.onrender.com";

const api = axios.create({
  baseURL: BASEURL ? BASEURL : "http://192.168.96.221:3000", // Fallback URL
});

export default api;
