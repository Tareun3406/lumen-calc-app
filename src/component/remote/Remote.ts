import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  activateRemote, deactivateRemote,
  getStompClient, initializeRemote,
  JoinedRoomInfo,
  RemoteCreatedInfo, selectRemote,
  setHostRoom,
  setInviteCode,
  setJoinRoom, setMemberList, setSocketStatus, showNotificationMessage
} from "../../features/board/remoteSlice";
import { selectBoard, setBoardState, setPreventTrigger } from "../../features/board/boardSlice";
import { toggleReadyTimer } from "../../features/board/timerSlice";
import { IMessage } from "@stomp/stompjs";

export function useRemote() {
  const dispatch = useAppDispatch();
  const boardState = useAppSelector(selectBoard);
  const { isPlayer, username, roomId, socketStatus } = useAppSelector(selectRemote);

  const connectRemote = async () => {
    dispatch(initializeRemote());
    return dispatch(activateRemote()).unwrap();
  }

  const disconnectRemote = async () => {
    dispatch(showNotificationMessage({message: "연결이 종료되었습니다.", status: "info"}))
    return dispatch(deactivateRemote()).unwrap();
  }

  const disconnectedWithHost = async () => {
    dispatch(showNotificationMessage({message: "호스트와의 연결이 끊어졌습니다.", status: "warning"}))
    return dispatch(deactivateRemote()).unwrap();
  }

  const hostRemote = () => {
    const stompClient = getStompClient();
    stompClient?.subscribe("/user/queue/created",(message) => {
      const createdRoom = JSON.parse(message.body) as RemoteCreatedInfo
      dispatch(setInviteCode(createdRoom.playerCode));
      dispatch(setHostRoom(createdRoom));
      joinRemote(createdRoom.playerCode);
    });
    stompClient?.publish({ destination: "/app/remote/create", body: JSON.stringify({ hostName: username, board: boardState }) });
  }

  const joinRemote = (inviteCode: string) => {
    const stompClient = getStompClient();
    stompClient?.subscribe("/user/queue/joined", (message) => {
      const joinedRoom = JSON.parse(message.body) as JoinedRoomInfo
      dispatch(setJoinRoom(joinedRoom));
      dispatch(setBoardState(joinedRoom.board));
      stompClient.subscribe(`/topic/remote/${joinedRoom.roomId}/disconnect`, () => disconnectedWithHost())
      stompClient.subscribe(`/topic/remote/${joinedRoom.roomId}/memberList`, (message) => dispatch(setMemberList(JSON.parse(message.body))));
      stompClient.subscribe(`/topic/remote/${joinedRoom.roomId}/updateBoard`, (message) => {
        dispatch(setBoardState(JSON.parse(message.body)));
      });
      stompClient.subscribe(`/topic/remote/${joinedRoom.roomId}/timer`, toggleTimer);
      dispatch(setSocketStatus("CONNECTED"));
      dispatch(showNotificationMessage({message: "연결 성공", status: "success"}));
    })
    stompClient?.publish({ destination: "/app/remote/joinAsCode", body: JSON.stringify({name: username, inviteCode: inviteCode})})
  }

  const publishUpdate = () => {
    if (!isPlayer || boardState.preventTrigger) return;
    if (socketStatus !== "CONNECTED") return;
    dispatch(setPreventTrigger(true));
    const stompClient = getStompClient();
    stompClient?.publish({destination: `/app/remote/updateBoard`, headers:{roomId}, body: JSON.stringify(boardState)});
  }

  const publishTimer = (isOn: boolean) => {
    if (socketStatus !== "CONNECTED") return;
    const stompClient = getStompClient();
    stompClient?.publish({destination: `/app/remote/timer`, headers:{roomId}, body: JSON.stringify(isOn)});
  }

  const toggleTimer = (message: IMessage) => {
    const isOn = JSON.parse(message.body) as boolean;
    dispatch(toggleReadyTimer(isOn));
  }

  return { connectRemote, disconnectRemote, hostRemote, joinRemote, publishUpdate, publishTimer }
}