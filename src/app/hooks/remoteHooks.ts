import { useAppDispatch, useAppSelector } from "./storeHooks";
import {
  activateRemote,
  deactivateRemote,
  getStompClient,
  initializeRemote,
  INotificationMessage,
  JoinedRoomInfo,
  MemberListMessage,
  RemoteCreatedInfo,
  selectRemote,
  setHostRoom,
  setJoiningCode,
  setJoinRoom,
  setMemberList,
  setSocketStatus,
  showNotificationMessage
} from "../slices/remoteSlice";
import { selectBoard, setBoardState, setPreventTrigger } from "../slices/boardSlice";
import { toggleReadyTimer } from "../slices/timerSlice";
import { IMessage } from "@stomp/stompjs";

export function useRemote() {
  const dispatch = useAppDispatch();
  const boardState = useAppSelector(selectBoard);
  const { hasControl, username, roomId, socketStatus, joiningCode } = useAppSelector(selectRemote);

  const connectRemote = async () => {
    dispatch(initializeRemote());
    return dispatch(activateRemote()).unwrap();
  };

  const handleNotificationMessage = (message: string) => {
    const notification = JSON.parse(message) as INotificationMessage;
    dispatch(showNotificationMessage(notification));
  };

  const disconnectRemote = async () => {
    dispatch(showNotificationMessage({ message: "연결이 종료되었습니다.", status: "info" }));
    return dispatch(deactivateRemote()).unwrap();
  };

  const reconnectRemote = async () => {
    await dispatch(deactivateRemote()).unwrap();
    await dispatch(activateRemote()).unwrap();
    joinRemote({ inviteCode: joiningCode, isReconnect: true });
  };

  const handleDisconnectedFromServer = async (message: string) => {
    dispatch(showNotificationMessage({ message: message, status: "warning" }));
    return dispatch(deactivateRemote()).unwrap();
  };

  const hostRemote = () => {
    const stompClient = getStompClient();
    stompClient?.subscribe("/user/queue/created", message => {
      const createdRoom = JSON.parse(message.body) as RemoteCreatedInfo;
      dispatch(setJoiningCode(createdRoom.playerCode));
      dispatch(setHostRoom(createdRoom));
      joinRemote({ inviteCode: createdRoom.playerCode, isReconnect: false });
    });
    stompClient?.publish({
      destination: "/app/remote/create",
      body: JSON.stringify({ hostName: username, board: boardState })
    });
  };

  const handleMemberListMessage = (memberList: MemberListMessage) => {
    dispatch(setMemberList(memberList));
  };

  const joinRemote = (joinRequest: { inviteCode: string; isReconnect: boolean }) => {
    const stompClient = getStompClient();
    stompClient?.subscribe("/user/queue/joined", message => {
      if (!message.body) {
        dispatch(showNotificationMessage({ message: "방을 찾지 못했습니다.", status: "error" }));
        dispatch(setSocketStatus("ERROR"));
        return;
      }
      const joinedRoom = JSON.parse(message.body) as JoinedRoomInfo;
      dispatch(setJoinRoom(joinedRoom));
      dispatch(setBoardState(joinedRoom.board));
      stompClient.subscribe(`/topic/remote/${joinedRoom.roomId}/notification`, message =>
        handleNotificationMessage(message.body)
      );
      stompClient.subscribe(`/topic/remote/${joinedRoom.roomId}/disconnect`, message =>
        handleDisconnectedFromServer(message.body)
      );
      stompClient.subscribe(`/topic/remote/${joinedRoom.roomId}/memberList`, message =>
        handleMemberListMessage(JSON.parse(message.body))
      );
      stompClient.subscribe(`/topic/remote/${joinedRoom.roomId}/updateBoard`, message => {
        dispatch(setBoardState(JSON.parse(message.body)));
      });
      stompClient.subscribe(`/topic/remote/${joinedRoom.roomId}/timer`, toggleTimer);
      dispatch(setSocketStatus("CONNECTED"));
      dispatch(showNotificationMessage({ message: "연결 성공", status: "success" }));
      dispatch(setJoiningCode(joinRequest.inviteCode));
    });
    stompClient?.publish({
      destination: "/app/remote/joinAsCode",
      body: JSON.stringify({ name: username, inviteCode: joinRequest.inviteCode, isReconnect: joinRequest.isReconnect })
    });
  };

  const publishUpdate = () => {
    if (!hasControl || boardState.preventTrigger) return;
    if (socketStatus !== "CONNECTED") return;
    dispatch(setPreventTrigger(true));
    const stompClient = getStompClient();
    stompClient?.publish({
      destination: `/app/remote/updateBoard`,
      headers: { roomId },
      body: JSON.stringify(boardState)
    });
  };

  const publishTimer = (isOn: boolean) => {
    if (socketStatus !== "CONNECTED") return;
    const stompClient = getStompClient();
    stompClient?.publish({ destination: `/app/remote/timer`, headers: { roomId }, body: JSON.stringify(isOn) });
  };

  const toggleTimer = (message: IMessage) => {
    const isOn = JSON.parse(message.body) as boolean;
    dispatch(toggleReadyTimer(isOn));
  };

  return { connectRemote, reconnectRemote, disconnectRemote, hostRemote, joinRemote, publishUpdate, publishTimer };
}
