import { useAppDispatch, useAppSelector } from "./storeHooks";
import { selectRemote } from "../slices/remoteSlice";
import {
  addToDamageLogs,
  addTokenToFirst,
  addTokenToSecond,
  changeTokenToggleToFirst,
  changeTokenToggleToSecond,
  damageToFirst,
  damageToSecond,
  decreaseFpToFirst,
  decreaseFpToSecond,
  healToFirst,
  healToSecond, IDamageLog,
  increaseFpToFirst,
  increaseFpToSecond,
  initialize,
  PlayerState, removeFromDamageLogs,
  removeTokenToFirst,
  removeTokenToSecond,
  resetFpToFirst,
  resetFpToSecond, selectDamageLogs,
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
  otherPlayer?: PlayerState;
}

export function usePlayerAction(props: IActionProps) {
  const dispatch = useAppDispatch();
  const { isFirst, currentHp, character } = props.player;
  const otherPlayer = props.otherPlayer;
  const { hasControl, socketStatus } = useAppSelector(selectRemote);

  // HP 관련
  const damageToHp = (value: number) => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    const damaged = Math.min(currentHp, value);
    const damageLog: IDamageLog = {
      isFirstPlayer: isFirst,
      type: "DAMAGE",
      payload: damaged,
      result: currentHp - damaged
    };

    if (isFirst) dispatch(damageToFirst(damaged));
    else dispatch(damageToSecond(damaged));
    dispatch(addToDamageLogs(damageLog))
    dispatch(triggerPublish());
  };
  const healToHp = (value: number) => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    const valueSum = currentHp + value
    const healed = valueSum > character.hp.maxHp ? character.hp.maxHp - currentHp : value
    const damageLog: IDamageLog = {
      isFirstPlayer: isFirst,
      type: "HEAL",
      payload: healed,
      result: currentHp + healed
    };

    if (isFirst) dispatch(healToFirst(healed));
    else dispatch(healToSecond(healed));
    dispatch(addToDamageLogs(damageLog))
    dispatch(triggerPublish());
  };
  const damageToOther = (value: number) => {
    if (!hasControl && socketStatus === "CONNECTED") return;
    if (!otherPlayer) {
      console.error("목표 대상이 지정되지 않았습니다.")
      return;
    }

    const damaged = Math.min(otherPlayer.currentHp, value);
    const damageLog: IDamageLog = {
      isFirstPlayer: otherPlayer.isFirst,
      type: "DAMAGE",
      payload: damaged,
      result: otherPlayer.currentHp - damaged
    };

    if (otherPlayer.isFirst) dispatch(damageToFirst(damaged));
    else dispatch(damageToSecond(damaged));
    dispatch(addToDamageLogs(damageLog))
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
    damageToOther,
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
  const damageLogs = useAppSelector(selectDamageLogs)
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

  // 데미지 로그
  const goToPreviousDamage = () => {
    if (damageLogs.length == 0) {
      return
    }
    const lastIndex = damageLogs.length - 1
    const damageLog = damageLogs[lastIndex]

    if (damageLog.type == "DAMAGE") {
      if (damageLog.isFirstPlayer) dispatch(healToFirst(damageLog.payload))
      else dispatch(healToSecond(damageLog.payload))
    } else {
      if (damageLog.isFirstPlayer) dispatch(damageToFirst(damageLog.payload))
      else dispatch(damageToSecond(damageLog.payload))
    }
    dispatch(removeFromDamageLogs(lastIndex))
    dispatch(triggerPublish())
  }

  return { initializeBoard, toggleReadyTimerAction, goToPreviousDamage };
}
