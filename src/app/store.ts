import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import boardSlice from "./slices/boardSlice";
import remoteSlice from "./slices/remoteSlice";
import timerSlice from "./slices/timerSlice";
import dialogSlice from "./slices/dialogSlice";

export const store = configureStore({
  reducer: {
    board: boardSlice,
    remote: remoteSlice,
    timer: timerSlice,
    dialog: dialogSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
