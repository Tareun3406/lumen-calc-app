import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ITimer {
  time: number,
  toggle: boolean,
  preventTrigger: boolean,
}

export interface ITimerState {
  readyTimer: ITimer,
}

const initialState: ITimerState = {
  readyTimer: {
    time: 10,
    toggle: false,
    preventTrigger: true,
  }
}

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    toggleReadyTimer: (state, action: PayloadAction<boolean>) => {
      state.readyTimer.preventTrigger = false;
      state.readyTimer.toggle = action.payload;
    },
    setReadyTimerTime: (state, action: PayloadAction<number>) => {
      state.readyTimer.time = action.payload;
    },
    decreaseReadyTimerTime: (state) => {
      state.readyTimer.time--;
    },
    preventReadyTimer: (state) => {
      state.readyTimer.preventTrigger = true;
    }
  }
})

export const { toggleReadyTimer, setReadyTimerTime, decreaseReadyTimerTime, preventReadyTimer } = timerSlice.actions;
export const selectTimer = (state: RootState) => state.timer;
export default timerSlice.reducer;