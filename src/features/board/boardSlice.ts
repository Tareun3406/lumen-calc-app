import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { character } from "../characters";

export interface PlayerState {
  healthPoint: number;
  character: character;
  token: number;
}

export interface BoardState {
  firstPlayer: PlayerState;
  secondPlayer: PlayerState;
}

const initialState: BoardState = {
  firstPlayer: {
    healthPoint: 5000,
    character: {
      name: "루트",
      portrait: "/portrait/루트.png"
    },
    token: 0
  },
  secondPlayer: {
    healthPoint: 5000,
    character: {
      name: "루트",
      portrait: "/portrait/루트.png"
    },
    token: 0
  }
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    initialize: state => {
      state.firstPlayer.healthPoint = 5000;
      state.secondPlayer.healthPoint = 5000;
      state.firstPlayer.token = 0;
      state.secondPlayer.token = 0;
    },
    damageToFirst: (state, action: PayloadAction<number>) => {
      state.firstPlayer.healthPoint -= action.payload;
    },
    damageToSecond: (state, action: PayloadAction<number>) => {
      state.secondPlayer.healthPoint -= action.payload;
    },
    healToFirst: (state, action: PayloadAction<number>) => {
      state.firstPlayer.healthPoint += action.payload;
    },
    healToSecond: (state, action: PayloadAction<number>) => {
      state.secondPlayer.healthPoint += action.payload;
    },
    setHealthToFirst: (state, action: PayloadAction<number>) => {
      state.firstPlayer.healthPoint = action.payload;
    },
    setHealthToSecond: (state, action: PayloadAction<number>) => {
      state.secondPlayer.healthPoint = action.payload;
    },
    setCharacterToFirst: (state, action: PayloadAction<character>) => {
      state.firstPlayer.character = action.payload;
    },
    setCharacterToSecond: (state, action: PayloadAction<character>) => {
      state.secondPlayer.character = action.payload;
    }
  }
});

export const { initialize, damageToFirst, damageToSecond, setCharacterToFirst, setCharacterToSecond } =
  boardSlice.actions;
export const selectBoard = (state: RootState) => state.board;
export const selectFirstPlayer = (state: RootState) => state.board.firstPlayer;
export const selectSecondPlayer = (state: RootState) => state.board.secondPlayer;

export default boardSlice.reducer;
