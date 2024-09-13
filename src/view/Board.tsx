import { useAppDispatch } from "../app/hooks";
import { initialize } from "../features/board/boardSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function Board() {
  // const firstPlayer = useAppSelector(selectFirstPlayer);
  // const secondPlayer = useAppSelector(selectSecondPlayer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialize());
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Board;
