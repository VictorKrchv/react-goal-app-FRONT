import { createSlice } from "@reduxjs/toolkit";
import { goalApi } from "~/api/goal";
import { errorMessage } from "~/lib/error-message";
import { AppThunk } from "~/store";

const initialState: GoalState = {
  list: [],
  isLoading: false,
  currentGoal: null,
  errorMessage: "",
};

const goal = createSlice({
  name: "goal",
  initialState,
  reducers: {
    getListSuccess(state, action) {
      state.list = action.payload;
      state.isLoading = false;
    },
    getListFailure(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    getCurrentGoalSuccess(state, action) {
      state.isLoading = false;
      state.currentGoal = action.payload;
    },
    setIsLoading(state) {
      state.isLoading = true;
    },
    setIsComplete(state, action) {
      state.currentGoal.plans = state.currentGoal.plans.map((plan) => {
        return action.payload === plan.id
          ? { ...plan, isComplete: true }
          : plan;
      });
    },
  },
});

export const {
  getListFailure,
  getListSuccess,
  setIsLoading,
  getCurrentGoalSuccess,
  setIsComplete,
} = goal.actions;

// THUNK
// получить список целей
export const getListData = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading());
  try {
    const data = await goalApi.getList();
    dispatch(getListSuccess(data));
  } catch (error) {
    dispatch(getListFailure(errorMessage(error)));
  }
};

// получить конкретную цель по ID
export const getGoal = (id): AppThunk => async (dispatch) => {
  dispatch(setIsLoading());
  try {
    const data = await goalApi.getCurrentById(id);
    dispatch(getCurrentGoalSuccess(data));
  } catch (error) {
    dispatch(getListFailure(errorMessage(error)));
  }
};

// отметить план как выполненый
export const setPlanIsComplete = (id): AppThunk => async (dispatch) => {
  try {
    await goalApi.setPlanIsComplete(id);
    dispatch(setIsComplete(id));
  } catch (e) {}
};

export default goal.reducer;
