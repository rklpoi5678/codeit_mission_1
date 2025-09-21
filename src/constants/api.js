import axios from "axios";
export const BASE_URL = "https://panda-market-api.vercel.app/";
export const app = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

