import { useAppDispatch, useAppSelector } from "./storeHooks";
import { selectRemote } from "../slices/remoteSlice";
import {
  addTokenToFirst,
  addTokenToSecond,
  changeTokenToggleToFirst,
  changeTokenToggleToSecond,
  damageToFirst,
  damageToSecond,
  decreaseFpToFirst,
  decreaseFpToSecond,
  healToFirst,
  healToSecond,
  increaseFpToFirst,
  increaseFpToSecond,
  initialize,
  PlayerState,
  removeTokenToFirst,
  removeTokenToSecond,
  resetFpToFirst,
  resetFpToSecond,
  setTokenCountToFirst,
  setTokenCountToSecond,
  setTokenToggleToFirst,
  setTokenToggleToFirstAsList,
  setTokenToggleToSecond,
  setTokenToggleToSecondAsList,
  triggerPublish
} from "../slices/boardSlice";
import { selectTimer, toggleReadyTimer } from "../slices/timerSlice";
import { useRemote } from "./remoteHooks";

export interface IActionProps {
  player: PlayerState;
}

export function usePlayerAction(props: IActionProps) {
  const dispatch = useAppDispatch();
  const { isFirst } = props.player;
  const { hasControl, socketStatus } = useAppSelector(selectRemote);

  // HP 관련
  const damageToHp = (value: number) => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(damageToFirst(value));
    else dispatch(damageToSecond(value));
    dispatch(triggerPublish());
  };
  const healToHp = (value: number) => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(healToFirst(value));
    else dispatch(healToSecond(value));
    dispatch(triggerPublish());
  };

  // FP 관련
  const increaseFp = (value: number) => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(increaseFpToFirst(value));
    else dispatch(increaseFpToSecond(value));
    dispatch(triggerPublish());
  };
  const decreaseFp = (value: number) => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(decreaseFpToFirst(value));
    else dispatch(decreaseFpToSecond(value));
    dispatch(triggerPublish());
  };
  const resetFp = () => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(resetFpToFirst());
    else dispatch(resetFpToSecond());
    dispatch(triggerPublish());
  };

  // token 관련
  const changeToggle = (index: number) => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(changeTokenToggleToFirst(index));
    else dispatch(changeTokenToggleToSecond(index));
    dispatch(triggerPublish());
  };
  const addToken = (index: number) => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(addTokenToFirst(index));
    else dispatch(addTokenToSecond(index));
    dispatch(triggerPublish());
  };
  const removeToken = (index: number) => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(removeTokenToFirst(index));
    else dispatch(removeTokenToSecond(index));
    dispatch(triggerPublish());
  };
  const setTokenCount = (index: number, value: number) => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(setTokenCountToFirst({ index, value }));
    else dispatch(setTokenCountToSecond({ index, value }));
    dispatch(triggerPublish());
  };
  const setTokenToggle = (payload: { index: number; value: boolean }) => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(setTokenToggleToFirst(payload));
    else dispatch(setTokenToggleToSecond(payload));
    dispatch(triggerPublish());
  };
  const setTokenToggleAsList = (payload: { [key: number]: boolean }) => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    if (isFirst) dispatch(setTokenToggleToFirstAsList(payload));
    else dispatch(setTokenToggleToSecondAsList(payload));
    dispatch(triggerPublish());
  };

  return {
    damageToHp,
    healToHp,
    increaseFp,
    decreaseFp,
    resetFp,
    changeToggle,
    addToken,
    removeToken,
    setTokenCount,
    setTokenToggle,
    setTokenToggleAsList
  };
}

export function useGlobalAction() {
  const dispatch = useAppDispatch();
  const { hasControl, socketStatus } = useAppSelector(selectRemote);
  const { readyTimer } = useAppSelector(selectTimer);
  const { publishTimer } = useRemote();

  // 초기화
  const initializeBoard = () => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    dispatch(initialize());
    dispatch(triggerPublish());
  };

  // 타이머 관련
  const toggleReadyTimerAction = () => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    if (socketStatus === "CONNECTED") {
      publishTimer(!readyTimer.toggle);
      return;
    }
    dispatch(toggleReadyTimer(!readyTimer.toggle));
  };

  return { initializeBoard, toggleReadyTimerAction };
}
