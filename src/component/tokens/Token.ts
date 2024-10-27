import {
  addTokenToFirst,
  addTokenToSecond, changeTokenToggleToFirst, changeTokenToggleToSecond,
  PlayerState,
  removeTokenToFirst,
  removeTokenToSecond, setTokenCountToFirst, setTokenCountToSecond, setTokenToggleToFirst, setTokenToggleToSecond
} from "../../features/board/boardSlice";
import { useAppDispatch } from "../../app/hooks";

export interface TokensInterface {
  player: PlayerState
}

export function useToken(props: TokensInterface) {
  const dispatch = useAppDispatch();
  const { isFirst } = props.player;

  const changeToggle = (index: number) =>
    isFirst ? dispatch(changeTokenToggleToFirst(index)) : dispatch(changeTokenToggleToSecond(index));

  const addToken = (index: number) =>
    isFirst ? dispatch(addTokenToFirst(index)) : dispatch(addTokenToSecond(index));

  const removeToken = (index: number) =>
    isFirst ? dispatch(removeTokenToFirst(index)) : dispatch(removeTokenToSecond(index));

  const setTokenCount = (index: number, value: number) =>
    isFirst
      ? dispatch(setTokenCountToFirst({ index, value }))
      : dispatch(setTokenCountToSecond({ index, value }));

  const setTokenToggle = (payload: { index: number; value: boolean }) =>
    isFirst ? dispatch(setTokenToggleToFirst(payload)) : dispatch(setTokenToggleToSecond(payload));

  return {changeToggle, addToken, removeToken, setTokenCount, setTokenToggle }
}