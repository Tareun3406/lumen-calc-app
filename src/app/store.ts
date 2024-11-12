import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import boardSlice from "../features/board/boardSlice";
import remoteSlice from "../features/board/remoteSlice";
import timerSlice from "../features/board/timerSlice";

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
