import { configureStore } from '@reduxjs/toolkit';
import signUpReducer  from "../Redux/Slices/SignUpSlices";
import signInSlice from "../Redux/Slices/LoginSlices";
import createSurveyReducer from "../Redux/Slices/CreatesurveySlices";
export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    loginIn: signInSlice,
    Survey: createSurveyReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;