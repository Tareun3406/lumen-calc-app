import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import characters, { Character } from "../Characters";
import { Simulate } from "react-dom/test-utils";

export interface PlayerState {
  isFirst: boolean;
  currentHp: number;
  damagedHp: number;
  character: Character;
}

export interface BoardState {
  firstPlayer: PlayerState;
  secondPlayer: PlayerState;
}

const initialState: BoardState = {
  firstPlayer: {
    isFirst: true,
    currentHp: 5000,
    damagedHp: 0,
    character: characters[0]
  },
  secondPlayer: {
    isFirst: false,
    currentHp: 5000,
    damagedHp: 0,
    character: characters[0]
  }
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    initialize: state => {
      state.firstPlayer.currentHp = 5000;
      state.secondPlayer.currentHp = 5000;
    },
    damageToFirst: (state, action: PayloadAction<number>) => {
      state.firstPlayer.damagedHp = Math.min(state.firstPlayer.currentHp, action.payload);
      state.firstPlayer.currentHp = Math.max(state.firstPlayer.currentHp - action.payload, 0);
    },
    damageToSecond: (state, action: PayloadAction<number>) => {
      state.secondPlayer.damagedHp = Math.min(state.secondPlayer.currentHp, action.payload);
      state.secondPlayer.currentHp = Math.max(state.secondPlayer.currentHp - action.payload, 0);
    },
    healToFirst: (state, action: PayloadAction<number>) => {
      state.firstPlayer.damagedHp = 0;
      state.firstPlayer.currentHp = Math.min(state.firstPlayer.currentHp + action.payload, 5000);
    },
    healToSecond: (state, action: PayloadAction<number>) => {
      state.secondPlayer.damagedHp = 0;
      state.secondPlayer.currentHp = Math.min(state.secondPlayer.currentHp + action.payload, 5000);
    },
    setHealthToFirst: (state, action: PayloadAction<number>) => {
      const damage = action.payload - state.firstPlayer.currentHp;
      state.firstPlayer.damagedHp = damage > 0 ? 0 : damage;
      state.firstPlayer.currentHp = action.payload;
    },
    setHealthToSecond: (state, action: PayloadAction<number>) => {
      const damage = action.payload - state.secondPlayer.currentHp;
      state.secondPlayer.damagedHp = damage > 0 ? 0 : damage;
      state.secondPlayer.currentHp = action.payload;
    },
    setCharacterToFirst: (state, action: PayloadAction<Character>) => {
      state.firstPlayer.character = action.payload;
    },
    setCharacterToSecond: (state, action: PayloadAction<Character>) => {
      state.secondPlayer.character = action.payload;
    },
    changeTokenToggleToFirst: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const token = state.firstPlayer.character.tokens[index];
      if (token.type == "toggle") {
        state.firstPlayer.character.tokens[index].toggle = !token.toggle;
      }
    },
    changeTokenToggleToSecond: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const token = state.secondPlayer.character.tokens[index];
      if (token.type == "toggle") {
        state.secondPlayer.character.tokens[index].toggle = !token.toggle;
      }
    },
    addTokenToFirst: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const token = state.firstPlayer.character.tokens[index];
      if (token.type == "counter") {
        console.log("test");
        state.firstPlayer.character.tokens[index].count = Math.min(token.count! + 1, token.maxCount!);
      }
    },
    addTokenToSecond: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const token = state.secondPlayer.character.tokens[index];
      if (token.type == "counter") {
        state.secondPlayer.character.tokens[index].count = Math.min(token.count! + 1, token.maxCount!);
      }
    },
    removeTokenToFirst: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const token = state.firstPlayer.character.tokens[index];
      if (token.type == "counter" && !!token.count && !!token.maxCount) {
        state.firstPlayer.character.tokens[index].count = Math.max(token.count - 1, 0);
      }
    },
    removeTokenToSecond: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const token = state.secondPlayer.character.tokens[index];
      if (token.type == "counter" && !!token.count && !!token.maxCount) {
        state.secondPlayer.character.tokens[index].count = Math.min(token.count - 1, 0);
      }
    }
  }
});

export const {
  initialize,
  damageToFirst,
  damageToSecond,
  healToFirst,
  healToSecond,
  setCharacterToFirst,
  setCharacterToSecond,
  changeTokenToggleToFirst,
  changeTokenToggleToSecond,
  addTokenToFirst,
  addTokenToSecond,
  removeTokenToFirst,
  removeTokenToSecond
} = boardSlice.actions;
export const selectBoard = (state: RootState) => state.board;
export const selectFirstPlayer = (state: RootState) => state.board.firstPlayer;
export const selectSecondPlayer = (state: RootState) => state.board.secondPlayer;

export default boardSlice.reducer;
