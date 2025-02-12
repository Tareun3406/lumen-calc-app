import { Button, Stack } from "@mui/material";
import { IActionProps, usePlayerAction } from "../app/hooks/actionHooks";
import { useAppSelector } from "../app/hooks/storeHooks";
import { selectSettings } from "../app/slices/settingsSlice";
import { useMemo } from "react";
import { useDamageButtonStyle } from "../app/hooks/styleHooks";

function ButtonPanelProps(props: IActionProps) {
  const { damageToHp, healToHp } = usePlayerAction(props);
  const { damageButtonStyle, damageButtonSize } = useDamageButtonStyle();
  const { flipPanel } = useAppSelector(selectSettings);
  const isFirstPlayer = props.player.isFirst;

  const getClassNameAsIsFirst = useMemo( () => {
    return isFirstPlayer || !flipPanel ? "" : "reverseFlexRow";
  }, [flipPanel]);

  const paddingAsPlayer = () => {
    return isFirstPlayer ? { left: 3, right: 0 } : { left: 0, right: 3 };
  };

  return (
    <Stack padding={1} paddingLeft={paddingAsPlayer().left} paddingRight={paddingAsPlayer().right} spacing={1}>
      <div style={{ display: "flex", justifyContent: "space-between" }} className={getClassNameAsIsFirst}>
        <Button variant={"outlined"} size={damageButtonSize} sx={damageButtonStyle} onClick={() => damageToHp(100)}>
          -100
        </Button>
        <Button variant={"outlined"} size={damageButtonSize} sx={damageButtonStyle} onClick={() => damageToHp(200)}>
          -200
        </Button>
        <Button variant={"outlined"} size={damageButtonSize} sx={damageButtonStyle} onClick={() => damageToHp(300)}>
          -300
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }} className={getClassNameAsIsFirst}>
        <Button variant={"outlined"} size={damageButtonSize} sx={damageButtonStyle} onClick={() => damageToHp(400)}>
          -400
        </Button>
        <Button variant={"outlined"} size={damageButtonSize} sx={damageButtonStyle} onClick={() => damageToHp(500)}>
          -500
        </Button>
        <Button variant={"outlined"} size={damageButtonSize} sx={damageButtonStyle} onClick={() => damageToHp(600)}>
          -600
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }} className={getClassNameAsIsFirst}>
        <Button variant={"outlined"} size={damageButtonSize} sx={damageButtonStyle} onClick={() => damageToHp(700)}>
          -700
        </Button>
        <Button variant={"contained"} size={damageButtonSize} color={"error"} sx={damageButtonStyle} onClick={() => damageToHp(1000)}>
          -1000
        </Button>
        <Button variant={"contained"} color={"success"} size={damageButtonSize} sx={damageButtonStyle} onClick={() => healToHp(100)}>
          +100
        </Button>
      </div>
    </Stack>
  );
}

export default ButtonPanelProps;
