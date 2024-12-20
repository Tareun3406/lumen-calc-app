import { useEffect, useMemo, useRef } from "react";
import { decreaseReadyTimerTime, preventReadyTimer, selectTimer, setReadyTimerTime } from "../app/slices/timerSlice";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import { useGlobalAction } from "../app/hooks/actionHooks";

function GetTimerDisplay() {
  const dispatch = useAppDispatch();
  const { readyTimer } = useAppSelector(selectTimer);
  const readyTimerIntervalId = useRef<NodeJS.Timer>();
  const { toggleReadyTimerAction } = useGlobalAction();

  const timerColor = useMemo(() => {
    if (readyTimer.toggle) {
      if (readyTimer.time === 0) {
        return "error";
      }
      return "secondary";
    }
    return "info";
  }, [readyTimer]);

  useEffect(() => {
    if (readyTimer.time < 1) {
      clearInterval(readyTimerIntervalId.current);
    }
  }, [readyTimer.time]);
  useEffect(() => {
    if (readyTimer.preventTrigger) return;
    if (readyTimer.toggle) {
      readyTimerIntervalId.current = setInterval(() => {
        dispatch(decreaseReadyTimerTime());
      }, 1000);
    } else {
      clearInterval(readyTimerIntervalId.current);
      dispatch(setReadyTimerTime(10));
    }
    dispatch(preventReadyTimer());
  }, [readyTimer.toggle]);

  return (
    <Button
      variant={"contained"}
      size={"large"}
      style={{ borderRadius: 50, fontSize: 45, width: 90 }}
      color={timerColor}
      onClick={toggleReadyTimerAction}>
      {readyTimer.time}
    </Button>
  );
}

export default GetTimerDisplay;
