import { useAppDispatch, useAppSelector } from "../app/hooks";
import { damageToFirst, damageToSecond, selectFirstPlayer, selectSecondPlayer } from "../features/board/boardSlice";

function Board() {
  const firstPlayer = useAppSelector(selectFirstPlayer);
  const secondPlayer = useAppSelector(selectSecondPlayer);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>firstPlayer: {firstPlayer.healthPoint}</div>
      <div>secondPlayer: {secondPlayer.healthPoint}</div>
      <div>
        <button onClick={() => dispatch(damageToFirst(100))}>100 to first</button>
        <button onClick={() => dispatch(damageToSecond(100))}>100 to second</button>
      </div>
    </div>
  );
}

export default Board;
