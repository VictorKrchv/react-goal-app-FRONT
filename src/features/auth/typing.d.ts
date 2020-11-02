interface AuthState {
  id: number;
  email: string;
  isAuth: boolean;
  isReady: boolean;
  fingerPrint: string;
  isPending: boolean;
  errorMessage: string;
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

interface UserData {
  email: string;
  id: number;
}
