interface AuthState {
  user: UserData;
  isAuth: boolean;
  fingerPrint: string;
  isReady: boolean;
  isPending: boolean;
  errorMessage: string;
}

interface UserData {
  email: string;
  id: number;
  name: string;
  avatar: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

interface LoginValues extends UserCredentials {
  fingerPrint: string;
}

interface RegisterValues extends UserCredentials {
  repassword: string;
}

interface FacebookResponse {
  id: number;
  name: string;
  picture: {
    data: {
      url: string;
    };
  };
}

interface LoginFacebookValues extends FacebookResponse {
  fingerPrint: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserData;
}
