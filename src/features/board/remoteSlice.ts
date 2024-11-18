import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";
import { RootState } from "../../app/store";
import { BoardState } from "./boardSlice";

export interface RemoteState {
  socketStatus: "DISCONNECTED" | "CONNECTED" | "PENDING" | "IDLE" | "ERROR" | "NONE";
  username: string;
  isPlayer: boolean;
  playerInviteCode: string;
  observerInviteCode: string;
  playerList: Array<string>;
  observerList: Array<string>;
  roomId: string;
  hostName: string;
  joiningCode: string;
  notification: Notification;
  confirmReconnectModal: boolean;
}

export interface Notification {
  show: boolean,
  status: "success" | "info" | "warning" | "error",
  message: string,
}

export interface INotificationMessage {
  status: "success" | "info" | "warning" | "error",
  message: string,
}

export interface MemberListMessage {
  playerList: Array<string>;
  observerList: Array<string>;
}

export interface JoinedRoomInfo {
  assignedName: string;
  roomId: string;
  hostName: string;
  playerList: Array<string>;
  observerList: Array<string>;
  board: BoardState;
  isPlayer: boolean;
}

export interface RemoteCreatedInfo {
  roomId: string;
  playerCode: string;
  observerCode: string;
}

const initialState: RemoteState = {
  socketStatus: "NONE",
  username: "",
  isPlayer: true,
  playerInviteCode: "",
  observerInviteCode: "",
  playerList: [],
  observerList: [],
  hostName: "",
  roomId: "",
  joiningCode: "",
  notification: {
    message: "",
    status: "info",
    show: false
  },
  confirmReconnectModal: false,
};

let stompClient: Client | null = null;

export const activateRemote = createAsyncThunk(
  "remote/activateRemote",
  async (_, { dispatch }) => {
    stompClient = new Client({
      brokerURL: `${process.env.REACT_APP_WS_HOSTNAME}/remote-ws`,
      reconnectDelay: 0
    });

    return new Promise<void>((resolve, reject) => {
      stompClient!.onConnect = () => {
        dispatch(setSocketStatus("IDLE"));
        resolve();
      }
      stompClient!.onStompError = (frame) => {
        console.error("WebSocket STOMP 오류:", frame);
        dispatch(setSocketStatus("DISCONNECTED"))
        dispatch(showNotificationMessage({message:"서버와의 통신중 오류가 발생했습니다.", status: "error"}))
        reject(`Stomp Error: ${frame.body}`);
      }
      stompClient!.onWebSocketError = (error) => {
        console.error("WebSocket 오류:", error);
        dispatch(setSocketStatus("DISCONNECTED"))
        dispatch(showNotificationMessage({message: "서버와의 연결에 실패하였습니다.", status: "error"}))
        reject(`Stomp Error: ${error.message}`);
      }
      stompClient!.onWebSocketClose = (event: CloseEvent) => {
        if (event.wasClean) {
          stompClient = null;
          dispatch(setSocketStatus("NONE"));
          return;
        }
        dispatch(setSocketStatus("DISCONNECTED"));
        dispatch(showNotificationMessage({message: "서버와의 통신이 끊어졌습니다.", status: "error"}))
      }
      stompClient!.activate();
    })
  }
);

export const deactivateRemote = createAsyncThunk(
  "remote/deleteRemote",
  async (_, { dispatch }) => {
    try {
      if (stompClient) {
        await stompClient.deactivate();
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
      dispatch(setSocketStatus("ERROR"));
      throw error;  // 에러를 던져서 호출한 곳에서 확인할 수 있도록 처리
    }
  }
);



export const remoteSlice = createSlice({
  name: "remote",
  initialState,
  reducers: {
    initializeRemote: (state) => {
      state.username= "";
      state.isPlayer= true;
      state.playerInviteCode= "";
      state.observerInviteCode= "";
      state.playerList= [];
      state.observerList= [];
      state.roomId= "";
      state.joiningCode= "";
    },
    setSocketStatus: (state, action: PayloadAction<"DISCONNECTED" | "CONNECTED" | "PENDING" | "IDLE" | "ERROR" | "NONE">) => {
      state.socketStatus = action.payload;
    },
    setHostRoom: (state, action: PayloadAction<RemoteCreatedInfo>) => {
      state.roomId = action.payload.roomId;
      state.playerInviteCode = action.payload.playerCode;
      state.observerInviteCode = action.payload.observerCode;
    },
    setJoinRoom: (state, action: PayloadAction<JoinedRoomInfo>) => {
      state.username = action.payload.assignedName;
      state.roomId = action.payload.roomId;
      state.hostName = action.payload.hostName;
      state.playerList = action.payload.playerList;
      state.observerList = action.payload.observerList;
      state.isPlayer = action.payload.isPlayer;
    },
    setMemberList: (state, action: PayloadAction<MemberListMessage>) => {
      state.playerList = action.payload.playerList;
      state.observerList = action.payload.observerList;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setJoiningCode: (state, action: PayloadAction<string>) => {
      state.joiningCode = action.payload;
    },
    showNotificationMessage: (state, action: PayloadAction<{message: string, status: "success" | "info" | "warning" | "error"}>) => {
      state.notification.message = action.payload.message;
      state.notification.status = action.payload.status;
      state.notification.show = true;
    },
    closeNotification: (state) => {
      state.notification.show = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(activateRemote.pending, state => {
      state.socketStatus = "PENDING";
    })
  }
});

export const getStompClient = () => stompClient;
export const {
  initializeRemote,
  setSocketStatus,
  setHostRoom,
  setJoinRoom,
  setMemberList,
  setName,
  setJoiningCode,
  showNotificationMessage,
  closeNotification
} = remoteSlice.actions;

export const selectRemote = (state: RootState) => state.remote;
export default remoteSlice.reducer;