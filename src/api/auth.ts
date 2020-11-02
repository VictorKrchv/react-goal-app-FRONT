import { httpClient } from "../lib/request";

const registerUser = (values: RegisterValues): Promise<any> => {
  return httpClient.post("auth/register", values);
};

const loginUser = (values: LoginValues): Promise<any> => {
  return httpClient.post("auth/login", values);
};

const getUserData = () => {
  return httpClient.get("/auth/me");
};

export const authApi = {
  getUserData,
  loginUser,
  registerUser,
};
