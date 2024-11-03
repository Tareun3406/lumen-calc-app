import {
  damageToFirst,
  damageToSecond,
  healToFirst,
  healToSecond,
  PlayerState, triggerPublish
} from "../features/board/boardSlice";
import { Button, Stack } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { useRemote } from "./remote/Remote";

interface ButtonPanelProps {
  player: PlayerState
}

function ButtonPanelProps(props:ButtonPanelProps) {
  const dispatch = useAppDispatch();
  const { publishUpdate } = useRemote();

  const isFirstPlayer = props.player.isFirst

  const getClassNameAsIsFirst = () => {
    return isFirstPlayer ? "" : "reverseFlexRow";
  }

  const dispatchDamage = (value: number) =>  {
    if (isFirstPlayer) dispatch(damageToFirst(value))
    else dispatch(damageToSecond(value))
    publishUpdate();
    dispatch(triggerPublish());
  }

  const dispatchHeal = (value: number) => {
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