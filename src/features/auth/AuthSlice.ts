import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "~/api/auth";
import { AppThunk } from "~/store";
import { TokenStorage } from "~/lib/request/TokenStorage";
import { getFingerId } from "~/lib/finger-print";
import { errorMessage } from "~/lib/error-message";

const initialState: AuthState = {
  user: {
    email: "",
    id: 0,
    name: "",
    avatar: "",
  },
  isAuth: false,
  isReady: false,
  fingerPrint: "",
  isPending: false,
  errorMessage: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserSuccess(state, action: PayloadAction<UserData>) {
      const { email, id, name, avatar } = action.payload;
      state.isAuth = true;
      state.user.email = email;
      state.user.id = id;
      state.user.name = name;
      state.user.avatar = avatar;
    },
    loginUserFailure(state, action) {
      state.errorMessage = action.payload;
    },
    logoutUser(state) {
      state.user.email = "";
      state.user.id = 0;
      state.isAuth = false;
      state.isReady = true;
      TokenStorage.clear();
    },
    setIsReady(state) {
      state.isReady = true;
    },
    setFingerId(state, action) {
      state.fingerPrint = action.payload;
    },
    setIsPending(state, action) {
      state.isPending = action.payload;
    },
    clearError(state) {
      state.errorMessage = "";
    },
  },
});

export const {
  clearError,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  setFingerId,
  setIsReady,
  setIsPending,
} = auth.actions;
export default auth.reducer;

export const getUserData = (): AppThunk => async (dispatch) => {
  try {
    const { visitorId } = await getFingerId();
    dispatch(setFingerId(visitorId));
    if (TokenStorage.getToken()) {
      const { email, name, id, avatar } = await authApi.getUserData();
      dispatch(loginUserSuccess({ email, id, name, avatar }));
    }
  } catch (error) {
    console.log(error, "getUserData error");
  } finally {
    dispatch(setIsReady());
  }
};

export const loginUser = (values: LoginValues): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setIsPending(true));
    const { accessToken, refreshToken, user } = await authApi.loginUser(values);
    TokenStorage.storeToken(accessToken);
    TokenStorage.storeRefreshToken(refreshToken);
    dispatch(loginUserSuccess(user));
  } catch (error) {
    dispatch(loginUserFailure(errorMessage(error)));
  } finally {
    dispatch(setIsPending(false));
  }
};

export const loginUserFB = (values: LoginFacebookValues): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setIsPending(true));
    const { accessToken, refreshToken, user } = await authApi.loginFB(values);
    TokenStorage.storeToken(accessToken);
    TokenStorage.storeRefreshToken(refreshToken);
    dispatch(loginUserSuccess(user));
  } catch (error) {
    dispatch(loginUserFailure(errorMessage(error)));
  } finally {
    dispatch(setIsPending(false));
  }
};
