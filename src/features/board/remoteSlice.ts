import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";
import { RootState } from "../../app/store";
import { BoardState } from "./boardSlice";

export interface RemoteState {
  socketStatus: "DISCONNECTED" | "CONNECTED" | "PENDING" | "IDLE" | "ERROR" | "NONE";
  isHost: boolean;
  username: string;
  isPlayer: boolean;
  playerInviteCode: string;
  observerInviteCode: string;
  playerList: Array<string>;
  observerList: Array<string>;
  roomId: string;
  inviteCode: string;
}

export interface MemberListMessage {
  playerList: Array<string>;
  observerList: Array<string>;
}

export interface JoinedRoomInfo {
  assignedName: string;
  roomId: string;
  playerList: Array<string>;
  observerList: Array<string>;
}

export interface RemoteCreatedInfo {
  roomId: string;
  playerCode: string;
  observerCode: string;
}

const initialState: RemoteState = {
  socketStatus: "NONE",
  isHost: false,
  username: "",
  isPlayer: true,
  playerInviteCode: "",
  observerInviteCode: "",
  playerList: [],
  observerList: [],
  roomId: "",
  inviteCode: ""
};

let stompClient: Client | null = null;

export const createRemote = createAsyncThunk(
  "remote/createRemote",
  async (_, { dispatch }) => {
    stompClient = new Client({
      brokerURL: `${process.env.REACT_APP_WS_HOSTNAME}/remote-ws`,
    });

    return new Promise<void>((resolve, reject) => {
      stompClient!.onConnect = () => {
        dispatch(setSocketStatue("IDLE"));
        resolve();
      }
      stompClient!.onStompError = (frame) => {
        console.error("WebSocket STOMP 오류:", frame);
        dispatch(setSocketStatue("ERROR"))
        dispatch(disconnect());
        reject(`Stomp Error: ${frame.body}`);
      }
      stompClient!.onWebSocketError = (error) => {
        console.error("WebSocket 오류:", error);
        dispatch(setSocketStatue("ERROR"));
        dispatch(disconnect());
        reject(`Stomp Error: ${error.message}`);
      }
      stompClient!.activate();
    })
  }
);

export const remoteSlice = createSlice({
  name: "remote",
  initialState,
  reducers: {
    setSocketStatue: (state, action: PayloadAction<"DISCONNECTED" | "CONNECTED" | "PENDING" | "IDLE" | "ERROR" | "NONE">) => {
      console.log(`Socket Status: ${action.payload}`);
      state.socketStatus = action.payload;
    },
    disconnect: state => {
      stompClient?.publish({destination: `/app/remote/disconnect`, body: state.username, headers: {roomId: state.roomId} });
      stompClient?.deactivate().finally(() => stompClient = null);
    },
    setHostRoom: (state, action: PayloadAction<RemoteCreatedInfo>) => {
      state.roomId = action.payload.roomId;
      state.playerInviteCode = action.payload.playerCode;
      state.observerInviteCode = action.payload.observerCode;
    },
    setJoinRoom: (state, action: PayloadAction<JoinedRoomInfo>) => {
      state.username = action.payload.assignedName;
      state.roomId = action.payload.roomId;
      state.playerList = action.payload.playerList;
      state.observerList = action.payload.observerList;
    },
    setMemberList: (state, action: PayloadAction<MemberListMessage>) => {
      state.playerList = action.payload.playerList;
      state.observerList = action.payload.observerList;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setInviteCode: (state, action: PayloadAction<string>) => {
      state.inviteCode = action.payload;
    },
    setIsHost: (state, action: PayloadAction<boolean>) => {
      state.isHost = action.payload;
    },
    publishUpdate: (state, action: PayloadAction<BoardState>) => {
      stompClient?.publish({destination: `/app/remote/updateBoard`, headers:{roomId: state.roomId}, body: JSON.stringify(action.payload)});
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRemote.pending, state => {
      state.socketStatus = "PENDING";
    })
  }
});

export const getStompClient = () => stompClient;
export const { setSocketStatue, disconnect, setHostRoom, setJoinRoom, setMemberList, setName, setInviteCode, setIsHost, publishUpdate }
  = remoteSlice.actions;
export const selectRemote = (state: RootState) => state.remote;
export default remoteSlice.reducer;