import { configureStore, Action, combineReducers } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { authReducer } from "./features/auth";
import { goalReducer } from "./features/goal";

const rootReducer = combineReducers({
  auth: authReducer,
  goal: goalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
