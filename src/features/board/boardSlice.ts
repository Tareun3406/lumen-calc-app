import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Character } from "../Characters";

export interface PlayerState {
  isFirst: boolean;
  currentHp: number;
  damagedHp: number;
  character: Character;
  fp: number;
}
export interface damageLog {
  isFirstPlayer: boolean;
  type: "DAMAGE" | "HEAL";
  payload: number;
  result: number;
}

export interface BoardState {
  firstPlayer: PlayerState;
  secondPlayer: PlayerState;
  damageLogs: damageLog[];
  triggerPublish: boolean;
  preventTrigger: boolean;
}

const noneCharacter: Character = {
  name: "선택없음",
  portrait: "",
  tokens: []
};

const initialState: BoardState = {
  firstPlayer: {
    isFirst: true,
    currentHp: 5000,
    damagedHp: 0,
    character: noneCharacter,
    fp: 0
  },
  secondPlayer: {
    isFirst: false,
    currentHp: 5000,
    damagedHp: 0,
    character: noneCharacter,
    fp: 0
  },
  damageLogs: [],
  triggerPublish: false,
  preventTrigger: true,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    initialize: state => {
      state.firstPlayer.currentHp = 5000;
      state.firstPlayer.damagedHp = 0;
      state.secondPlayer.currentHp = 5000;
      state.secondPlayer.damagedHp = 0;
      state.firstPlayer.fp = 0;
      state.secondPlayer.fp = 0;
      state.firstPlayer.character.tokens = state.firstPlayer.character.tokens.map(token => {
        switch (token.type) {
          case "TOGGLE":
            token.toggle = false;
            return token;
          case "COUNTER":
            token.count = 0;
            return token;
          default: return token;
        }
      });
      state.secondPlayer.character.tokens = state.secondPlayer.character.tokens.map(token => {
        switch (token.type) {
          case "TOGGLE":
            token.toggle = false;
            return token;
          case "COUNTER":
            token.count = 0;
            return token;
          default: return token;
        }
      });
      state.damageLogs = [];
      state.triggerPublish = !state.triggerPublish;
    },
    damageToFirst: (state, action: PayloadAction<number>) => {
      const damaged = Math.min(state.firstPlayer.currentHp, action.payload);
      state.firstPlayer.damagedHp = damaged;
      state.firstPlayer.currentHp = Math.max(state.firstPlayer.currentHp - action.payload, 0);
      state.damageLogs.push({isFirstPlayer : true, type: "DAMAGE", payload: damaged, result: state.firstPlayer.currentHp});
    },
    damageToSecond: (state, action: PayloadAction<number>) => {
      const damaged = Math.min(state.secondPlayer.currentHp, action.payload);
      state.secondPlayer.damagedHp = damaged;
      state.secondPlayer.currentHp = Math.max(state.secondPlayer.currentHp - action.payload, 0);
      state.damageLogs.push({isFirstPlayer : false, type: "DAMAGE", payload: damaged, result: state.secondPlayer.currentHp});
    },
    healToFirst: (state, action: PayloadAction<number>) => {
      const sum = state.firstPlayer.currentHp + action.payload;
      const healed = sum > 5000 ? (sum - 5000) : action.payload;
      state.firstPlayer.damagedHp = 0;
      state.firstPlayer.currentHp = Math.min(state.firstPlayer.currentHp + action.payload, 5000);
      state.damageLogs.push({isFirstPlayer : true, type: "HEAL", payload: healed, result: state.firstPlayer.currentHp});
    },
    healToSecond: (state, action: PayloadAction<number>) => {
      const sum = state.secondPlayer.currentHp + action.payload;
      const healed = sum > 5000 ? (sum - 5000) : action.payload;
      state.secondPlayer.damagedHp = 0;
      state.secondPlayer.currentHp = Math.min(state.secondPlayer.currentHp + action.payload, 5000);
      state.damageLogs.push({isFirstPlayer : false, type: "HEAL", payload: healed, result: state.secondPlayer.currentHp});
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
    setTokenToggleToFirst: (state, action: PayloadAction<{ index: number; value: boolean }>) => {
      state.firstPlayer.character.tokens[action.payload.index].toggle = action.payload.value;
    },
    setTokenToggleToSecond: (state, action: PayloadAction<{ index: number; value: boolean }>) => {
      state.secondPlayer.character.tokens[action.payload.index].toggle = action.payload.value;
    },
    setTokenToggleToFirstAsList: (state, action: PayloadAction<{ [key: number]: boolean }>) => {
      state.firstPlayer.character.tokens = state.firstPlayer.character.tokens.map((item, index) => ({
        ...item,
        toggle: action.payload[index] ?? item.toggle,
      }));
    },

    setTokenToggleToSecondAsList: (state, action: PayloadAction<{ [key: number]: boolean }>) => {
      state.secondPlayer.character.tokens = state.secondPlayer.character.tokens.map((item, index) => ({
        ...item,
        toggle: action.payload[index] ?? item.toggle,
      }));
    },
    changeTokenToggleToFirst: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const token = state.firstPlayer.character.tokens[index];
      if (token.type === "TOGGLE") {
        state.firstPlayer.character.tokens[index].toggle = !token.toggle;
      }
    },
    changeTokenToggleToSecond: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const token = state.secondPlayer.character.tokens[index];
      if (token.type === "TOGGLE") {
        state.secondPlayer.character.tokens[index].toggle = !token.toggle;
      }
    },
    addTokenToFirst: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const token = state.firstPlayer.character.tokens[index];
      if (token.type === "COUNTER") {
        state.firstPlayer.character.tokens[index].count = Math.min(token.count! + 1, token.maxCount!);
      }
    },
    addTokenToSecond: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const token = state.secondPlayer.character.tokens[index];
      if (token.type === "COUNTER") {
        state.secondPlayer.character.tokens[index].count = Math.min(token.count! + 1, token.maxCount!);
      }
    },
    removeTokenToFirst: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const token = state.firstPlayer.character.tokens[index];
      if (token.type === "COUNTER" && !!token.count && !!token.maxCount) {
        state.firstPlayer.character.tokens[index].count = Math.max(token.count - 1, 0);
      }
    },
    removeTokenToSecond: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const token = state.secondPlayer.character.tokens[index];
      if (token.type === "COUNTER" && !!token.count && !!token.maxCount) {
        state.secondPlayer.character.tokens[index].count = Math.max(token.count - 1, 0);
      }
    },
    setTokenCountToFirst: (state, action: PayloadAction<{ index: number; value: number }>) => {
      state.firstPlayer.character.tokens[action.payload.index].count = action.payload.value;
    },
    setTokenCountToSecond: (state, action: PayloadAction<{ index: number; value: number }>) => {
      state.secondPlayer.character.tokens[action.payload.index].count = action.payload.value;
    },
    increaseFpToFirst: (state, action: PayloadAction<number>) => {
      state.firstPlayer.fp += action.payload;
    },
    increaseFpToSecond: (state, action: PayloadAction<number>) => {
      state.secondPlayer.fp += action.payload;
    },
    decreaseFpToFirst: (state, action: PayloadAction<number>) => {
      state.firstPlayer.fp -= action.payload;
    },
    decreaseFpToSecond: (state, action: PayloadAction<number>) => {
      state.secondPlayer.fp -= action.payload;
    },
    resetFpToFirst: state => {
      state.firstPlayer.fp = 0;
    },
    resetFpToSecond: state => {
      state.secondPlayer.fp = 0;
    },
    deselectCharacter: state => {
      state.firstPlayer.character = noneCharacter;
      state.secondPlayer.character = noneCharacter;
    },
    setBoardState: (state, action: PayloadAction<BoardState>) => {
      const board = action.payload;
      state.firstPlayer = board.firstPlayer;
      state.secondPlayer = board.secondPlayer;
      state.damageLogs = board.damageLogs;
    },
    triggerPublish: (state) => {
      state.triggerPublish = !state.triggerPublish;
      state.preventTrigger = false;
    },
    setPreventTrigger: (state, action: PayloadAction<boolean>) => {
      state.preventTrigger = action.payload;
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
  setTokenToggleToFirst,
  changeTokenToggleToSecond,
  setTokenToggleToSecond,
  setTokenToggleToFirstAsList,
  setTokenToggleToSecondAsList,
  addTokenToFirst,
  addTokenToSecond,
  removeTokenToFirst,
  removeTokenToSecond,
  setTokenCountToFirst,
  setTokenCountToSecond,
  increaseFpToFirst,
  increaseFpToSecond,
  decreaseFpToFirst,
  decreaseFpToSecond,
  resetFpToFirst,
  resetFpToSecond,
  deselectCharacter,
  setBoardState,
  triggerPublish,
  setPreventTrigger
} = boardSlice.actions;
export const selectBoard = (state: RootState) => state.board;
export const selectFirstPlayer = (state: RootState) => state.board.firstPlayer;
export const selectSecondPlayer = (state: RootState) => state.board.secondPlayer;
export const selectDamageLogs = (state: RootState) => state.board.damageLogs;

export default boardSlice.reducer;
