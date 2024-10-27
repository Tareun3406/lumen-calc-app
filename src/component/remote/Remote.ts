import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createRemote,
  getStompClient,
  JoinedRoomInfo,
  RemoteCreatedInfo, selectRemote,
  setHostRoom,
  setInviteCode,
  setJoinRoom, setMemberList, setSocketStatue
} from "../../features/board/remoteSlice";
import { selectBoard, setBoardState } from "../../features/board/boardSlice";

export function useRemote() {
  const dispatch = useAppDispatch();
  const boardState = useAppSelector(selectBoard);
  const { username, inviteCode } = useAppSelector(selectRemote);

  const connectRemote = async () => dispatch(createRemote()).unwrap();

  const hostRemote = () => {
    const stompClient = getStompClient();

    stompClient?.subscribe("/user/queue/created", (message) => {
      const createdRoom = JSON.parse(message.body) as RemoteCreatedInfo

      dispatch(setInviteCode(createdRoom.playerCode));
      dispatch(setHostRoom(createdRoom));

      return joinRemote();
    });
    stompClient?.publish({ destination: "/app/remote/create", body: JSON.stringify(boardState)});
  }

  const joinRemote = () => {
    const stompClient = getStompClient();
    stompClient?.subscribe("/user/queue/joined", (message) => {
      const joinedRoom = JSON.parse(message.body) as JoinedRoomInfo
      dispatch(setJoinRoom(joinedRoom));
      stompClient.subscribe(`/topic/remote/${joinedRoom.roomId}/memberList`, (message) => dispatch(setMemberList(JSON.parse(message.body))));
      stompClient.subscribe(`/topic/remote/${joinedRoom.roomId}/updateBoard`, (message) => dispatch(setBoardState(JSON.parse(message.body))));
      dispatch(setSocketStatue("CONNECTED"))
    })
    stompClient?.publish({ destination: "/app/remote/joinRoomAsCode", body: JSON.stringify({name: username, inviteCode: inviteCode})})
  }

  return { connectRemote, hostRemote, joinRemote }
}