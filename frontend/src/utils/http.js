import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-api-url.com",
});

export const http = instance;
export const endpoints = {
  register: "/register",
  login: "/login",
};

instance.interceptors.request.use(config => {
  const token = getToken();
  config.headers.authorization = `Bearer ${token}`;
  return config;
});

export const http = instance;
export const endpoints = {
  register: "/register",
  login: "/login",
};
