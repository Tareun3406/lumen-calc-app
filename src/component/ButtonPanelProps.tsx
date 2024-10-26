import { damageToSecond, healToSecond, PlayerState } from "../features/board/boardSlice";
import { Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

interface ButtonPanelProps {
  player: PlayerState
}

function ButtonPanelProps(props:ButtonPanelProps) {
  const dispatch = useDispatch();

  const isFirstPlayer = props.player.isFirst

  const getClassNameAsIsFirst = () => {
    return isFirstPlayer ? "" : "reverseFlexRow";
  }


  const buttonStyle = {
    width: 70
  };

  return(
    <Stack padding={1} paddingRight={3} spacing={1}>
      <div style={{ display: "flex", justifyContent: "space-between" }} className={ getClassNameAsIsFirst() }>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(100))}>
          -100
        </Button>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(200))}>
          -200
        </Button>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(300))}>
          -300
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }} className={ getClassNameAsIsFirst() }>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(400))}>
          -400
        </Button>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(500))}>
          -500
        </Button>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(600))}>
          -600
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }} className={ getClassNameAsIsFirst() }>
        <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(700))}>
          -700
        </Button>
        <Button
          variant={"contained"}
          size={"medium"}
          color={"error"}
          sx={buttonStyle}
          onClick={() => dispatch(damageToSecond(1000))}>
          -1000
        </Button>
        <Button
          variant={"contained"}
          color={"success"}
          size={"medium"}
          sx={buttonStyle}
          onClick={() => dispatch(healToSecond(100))}>
          +100
        </Button>
      </div>
    </Stack>
  )

}

export default ButtonPanelProps;