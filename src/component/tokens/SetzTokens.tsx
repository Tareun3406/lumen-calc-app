
import { IActionProps, usePlayerAction } from "../../app/hooks/actionHooks";
import { Card, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useMemo } from "react";

function SetzTokens(props: IActionProps) {
  const { player } = props;
  const { character } = player;
  const { tokens } = character;
  const { setTokenToggleAsList, changeToggle } = usePlayerAction(props);
  
  const toggledToken = useMemo(() => {
    const toggledToken = tokens.find((token, index) => index !== 0 && token.toggle)
    if (toggledToken) {
      return toggledToken;
    }
    return tokens[0];
  }, tokens)

  const handleClickTokenImg = () => {
    setTokenToggleAsList({0: true, 1: false, 2: false});
  }
  const handleToggleChange = (index: number) => {
    if (tokens[index].toggle) {
      changeToggle(index);
      return;
    }
    setTokenToggleAsList({0: true, 1: index === 1, 2: index === 2});
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
         className={player.isFirst ? "" : "reverseFlexRow"}>
      <img src={toggledToken.img} height={116} alt={toggledToken.img} onClick={handleClickTokenImg}/>
      <ToggleButtonGroup
        orientation={"vertical"}
        sx={{ height: 116 }}
        value={toggledToken.name}
        size={"large"}
        color={"success"}>
        <ToggleButton value={"신속"} onClick={() => handleToggleChange(1)}>
          신속
        </ToggleButton>
        <ToggleButton value={"정확"} onClick={() => handleToggleChange(2)}>
          정확
        </ToggleButton>
      </ToggleButtonGroup>
      <Card sx={{ width: 116, height: 116 }}>
        <Typography variant="body2">{toggledToken.description}</Typography>
      </Card>
    </div>
  );
}

export default SetzTokens