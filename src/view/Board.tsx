import { useAppDispatch } from "../app/hooks";
import { initialize } from "../features/board/boardSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function Board() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialize());
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Outlet />
    </div>
  );
}

export default Board;
