import { httpClient } from "../lib/request";

const registerUser = (values: RegisterValues): Promise<any> => {
  return httpClient.post("auth/register", values);
};

const loginUser = (values: LoginValues): Promise<LoginResponse> => {
  return httpClient.post("auth/login", values);
};

const loginFB = (values: LoginFacebookValues): Promise<LoginResponse> => {
  return httpClient.post("auth/facebook/login", values);
};

const getUserData = () => {
  return httpClient.get("/auth/me");
};

export const authApi = {
  getUserData,
  loginFB,
  loginUser,
  registerUser,
};
