import { useAppDispatch, useAppSelector } from "../app/hooks";
import { initialize, selectBoard } from "../features/board/boardSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { disconnect, publishUpdate, selectRemote } from "../features/board/remoteSlice";

function Board() {
  const dispatch = useAppDispatch();
  const boardState = useAppSelector(selectBoard);
  const { isPlayer } = useAppSelector(selectRemote);

  useEffect(() => {
    dispatch(initialize());
    return () => {
      dispatch(disconnect());
    }
  }, []);

  useEffect(() => {
    if (isPlayer) {
      // todo 직접 변경한 경우에만 실행
      // dispatch(publishUpdate(boardState));
    }
  }, [boardState]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Outlet />
    </div>
  );
}

export default Board;
