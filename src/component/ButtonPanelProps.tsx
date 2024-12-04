import {
  damageToFirst,
  damageToSecond,
  healToFirst,
  healToSecond,
  PlayerState, triggerPublish
} from "../app/slices/boardSlice";
import { Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import { selectRemote } from "../app/slices/remoteSlice";

interface ButtonPanelProps {
  player: PlayerState
}

function ButtonPanelProps(props:ButtonPanelProps) {
  const dispatch = useAppDispatch();
  const { isPlayer, socketStatus } = useAppSelector(selectRemote);

  const isFirstPlayer = props.player.isFirst

  const getClassNameAsIsFirst = () => {
    return isFirstPlayer ? "" : "reverseFlexRow";
  }

  // todo action 컴포넌트 생성 및 이동
  const dispatchDamage = (value: number) =>  {
    if (!isPlayer && socketStatus === "CONNECTED") return;
    if (isFirstPlayer) dispatch(damageToFirst(value))
    else dispatch(damageToSecond(value))
    dispatch(triggerPublish());
  }

  // todo action 컴포넌트 생성 및 이동
  const dispatchHeal = (value: number) => {
    if (!isPlayer && socketStatus === "CONNECTED") return;
    if (isFirstPlayer) dispatch(healToFirst(value))
    else dispatch(healToSecond(value));
    dispatch(triggerPublish());
  }

  const buttonStyle = {
    width: 70
  };

  const paddingAsPlayer = () => {
    return isFirstPlayer
      ? {left: 3, right: 0}
      : {left: 0, right: 3}
  }

  return(
    <Stack padding={1} paddingLeft={paddingAsPlayer().left} paddingRight={paddingAsPlayer().right} spacing={1}>
      <div style={{ display: "flex", justifyContent: "space-between" }} className={ getClassNameAsIsFirst() }>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatchDamage(100)}>
          -100
        </Button>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatchDamage(200)}>
          -200
        </Button>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatchDamage(300)}>
          -300
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }} className={ getClassNameAsIsFirst() }>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatchDamage(400)}>
          -400
        </Button>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatchDamage(500)}>
          -500
        </Button>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatchDamage(600)}>
          -600
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }} className={ getClassNameAsIsFirst() }>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatchDamage(700)}>
          -700
        </Button>
        <Button
          variant={"contained"}
          size={"medium"}
          color={"error"}
          sx={buttonStyle}
          onClick={() => dispatchDamage(1000)}>
          -1000
        </Button>
        <Button
          variant={"contained"}
          color={"success"}
          size={"medium"}
          sx={buttonStyle}
          onClick={() => dispatchHeal(100)}>
          +100
        </Button>
      </div>
    </Stack>
  )

}

export default ButtonPanelProps;