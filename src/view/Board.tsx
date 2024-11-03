import { useAppDispatch, useAppSelector } from "../app/hooks";
import { initialize, selectBoard } from "../features/board/boardSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { selectRemote } from "../features/board/remoteSlice";
import { useRemote } from "../component/remote/Remote";

function Board() {
  const dispatch = useAppDispatch();
  const boardState = useAppSelector(selectBoard);
  const { isPlayer } = useAppSelector(selectRemote);
  const { disconnectRemote, publishUpdate } = useRemote();

  useEffect(() => {
    console.log('init');
    dispatch(initialize());
    return () => {
      disconnectRemote().then();
    }
  }, []);

  useEffect(() => {
    if (isPlayer && !boardState.preventTrigger) {
      console.log("publish triggered");
      publishUpdate();
    }
  }, [boardState.triggerPublish]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Outlet />
    </div>
  );
}

export default Board;
