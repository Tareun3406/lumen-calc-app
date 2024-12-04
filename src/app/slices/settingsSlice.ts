import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ISettingsState {
  flipPanel: boolean;
}

const initialState: ISettingsState = {
  flipPanel: true
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
      setFlipPanel: (state, action: PayloadAction<boolean>) => {
        state.flipPanel = action.payload;
      }
    },
  }
)

export const { setFlipPanel } = settingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings;
export default settingsSlice.reducer;

