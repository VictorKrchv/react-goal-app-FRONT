import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "~/api/auth";
import { AppThunk } from "~/store";
import { TokenStorage } from "~/lib/request/TokenStorage";
import { getFingerId } from "~/lib/finger-print";

const initialState: AuthState = {
  id: 0,
  email: "",
  isReady: false,
  isAuth: false,
  fingerPrint: "",
  isPending: false,
  errorMessage: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserSuccess(state, action: PayloadAction<UserData>) {
      const { email, id } = action.payload;
      state.isAuth = true;
      state.email = email;
      state.id = id;
    },
    loginUserFailure(state, action) {
      state.errorMessage = action.payload;
    },
    logoutUser(state) {
      state.email = "";
      state.id = 0;
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
      const { user } = await authApi.getUserData();
      dispatch(loginUserSuccess({ email: user.email, id: user.id }));
    }
  } finally {
    dispatch(setIsReady());
  }
};

export const loginUser = (values: LoginValues): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setIsPending(true));
    const { accessToken, refreshToken, user } = await authApi.loginUser({
      ...values,
    });
    TokenStorage.storeToken(accessToken);
    TokenStorage.storeRefreshToken(refreshToken);
    dispatch(loginUserSuccess({ email: user.email, id: user.id }));
  } catch (e) {
    dispatch(loginUserFailure(e.response.data.message));
  } finally {
    dispatch(setIsPending(false));
  }
};
