import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import boardSlice from "./slices/boardSlice";
import remoteSlice from "./slices/remoteSlice";
import timerSlice from "./slices/timerSlice";
import dialogSlice from "./slices/dialogSlice";
import settingsSlice from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {
    board: boardSlice,
    remote: remoteSlice,
    timer: timerSlice,
    dialog: dialogSlice,
    settings: settingsSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
