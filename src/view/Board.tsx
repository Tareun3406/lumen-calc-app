import { useAppDispatch, useAppSelector } from "../app/hooks";
import { initialize, selectBoard } from "../features/board/boardSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { selectRemote } from "../features/board/remoteSlice";
import { useRemote } from "../component/remote/Remote";

function Board() {
  const dispatch = useAppDispatch();
  const boardState = useAppSelector(selectBoard);
  const { isPlayer, socketStatus } = useAppSelector(selectRemote);
  const { disconnectRemote, publishUpdate } = useRemote();

  useEffect(() => {
    if (!isPlayer && socketStatus === "CONNECTED") return;
    dispatch(initialize());
    return () => {
      disconnectRemote().then();
    }
  }, []);

  useEffect(() => {
    if (isPlayer && !boardState.preventTrigger) {
      publishUpdate();
    }
  }, [boardState.triggerPublish, boardState.preventTrigger]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Outlet />
    </div>
  );
}

export default Board;
