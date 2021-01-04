import { http, endpoints } from "./http";

export const login = (username, password) =>
  http.post(endpoints.login, {
    username,
    password
  });
