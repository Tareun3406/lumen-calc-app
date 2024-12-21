import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IDialogState {
  settingsDialog: {
    open: boolean
  },
  helpDialog: {
    open: boolean
  }
}

const initialState: IDialogState = {
  settingsDialog: {
    open: false
  },
  helpDialog: {
    open: false
  }
}



export const dialogSlice = createSlice({
  name: "dialog",
  initialState: initialState,
  reducers: {
    setOpenSettingsDialog: (state, action: PayloadAction<boolean>) => {
      state.settingsDialog.open = action.payload
    },
    setOpenHelpDialog: (state, action: PayloadAction<boolean>) => {
      state.helpDialog.open = action.payload
    }
  },
})

export const { setOpenSettingsDialog, setOpenHelpDialog } = dialogSlice.actions

export const selectDialog = (state: RootState) => state.dialog
export default dialogSlice.reducer