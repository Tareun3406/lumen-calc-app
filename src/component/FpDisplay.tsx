import { useMemo } from "react";
import { Button, IconButton } from "@mui/material";
import { PlayerState } from "../app/slices/boardSlice";
import { usePlayerAction } from "../app/hooks/actionHooks";

export interface IFpDisplay {
  player: PlayerState;
}

function FpDisplay(props: IFpDisplay) {
  const player = props.player;
  const { increaseFp, decreaseFp, resetFp } = usePlayerAction({ player });

  const getFpColor = useMemo(() => {
    if (player.fp > 0) return "info";
    if (player.fp < 0) return "error";
    return "success";
  }, [player.fp]);

  return (
    <div style={{ display: "inline-block", width: 72 }}>
      <IconButton onClick={() => increaseFp(1)}>+</IconButton>
      <Button
        variant={player.fp === 0 ? "outlined" : "contained"}
        fullWidth={true}
        color={getFpColor}
        onClick={resetFp}>
        {player.fp} fp
      </Button>
      <IconButton onClick={() => decreaseFp(1)}>-</IconButton>
    </div>
  );
}

export default FpDisplay;
