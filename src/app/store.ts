import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import boardSlice from "./slices/boardSlice";
import remoteSlice from "./slices/remoteSlice";
import timerSlice from "./slices/timerSlice";

export const store = configureStore({
  reducer: {
    board: boardSlice,
    remote: remoteSlice,
    timer: timerSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
