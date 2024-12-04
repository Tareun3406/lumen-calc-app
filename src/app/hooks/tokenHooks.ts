import {
  addTokenToFirst,
  addTokenToSecond,
  changeTokenToggleToFirst,
  changeTokenToggleToSecond,
  PlayerState,
  removeTokenToFirst,
  removeTokenToSecond,
  setTokenCountToFirst,
  setTokenCountToSecond,
  setTokenToggleToFirst, setTokenToggleToFirstAsList,
  setTokenToggleToSecond, setTokenToggleToSecondAsList, triggerPublish
} from "../slices/boardSlice";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { selectRemote } from "../slices/remoteSlice";

export interface TokensInterface {
  player: PlayerState
}

// todo action 컴포넌트 생성 및 이동
export function useToken(props: TokensInterface) {
  const dispatch = useAppDispatch();
  const { isFirst } = props.player;
  const { isPlayer, socketStatus } = useAppSelector(selectRemote);

  const changeToggle = (index: number) => {
    if (!isPlayer && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(changeTokenToggleToFirst(index));
    else dispatch(changeTokenToggleToSecond(index));
    dispatch(triggerPublish());
  }

  const addToken = (index: number) => {
    if (!isPlayer && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(addTokenToFirst(index));
    else dispatch(addTokenToSecond(index));
    dispatch(triggerPublish());
  }

  const removeToken = (index: number) => {
    if (!isPlayer && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(removeTokenToFirst(index));
    else dispatch(removeTokenToSecond(index));
    dispatch(triggerPublish());
  }

  const setTokenCount = (index: number, value: number) => {
    if (!isPlayer && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(setTokenCountToFirst({ index, value }))
    else dispatch(setTokenCountToSecond({ index, value }));
    dispatch(triggerPublish());
  }

  const setTokenToggle = (payload: { index: number; value: boolean }) => {
    if (!isPlayer && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(setTokenToggleToFirst(payload))
    else dispatch(setTokenToggleToSecond(payload));
    dispatch(triggerPublish());
  }

  const setTokenToggleAsList = (payload: { [key: number]: boolean }) => {
    if (!isPlayer && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(setTokenToggleToFirstAsList(payload));
    else dispatch(setTokenToggleToSecondAsList(payload));
    dispatch(triggerPublish());
  }

  return {changeToggle, addToken, removeToken, setTokenCount, setTokenToggle, setTokenToggleAsList }
}