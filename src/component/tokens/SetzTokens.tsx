
import { IActionProps, usePlayerAction } from "../../app/hooks/actionHooks";
import { Card, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useAppSelector } from "../../app/hooks/storeHooks";
import { selectSettings } from "../../app/slices/settingsSlice";
import { useTokenImageStyle } from "../../app/hooks/styleHooks";

function SetzTokens(props: IActionProps) {
  const { player } = props;
  const { character } = player;
  const { tokens } = character;
  const { setTokenToggleAsList, changeToggle } = usePlayerAction(props);
  const { flipPanel } = useAppSelector(selectSettings);
  const { largeTokenStyle } = useTokenImageStyle();

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
         className={player.isFirst || !flipPanel ? "" : "reverseFlexRow"}>
      <img src={toggledToken.img} style={largeTokenStyle} alt={toggledToken.img} onClick={handleClickTokenImg}/>
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
      <Card sx={largeTokenStyle}>
        <Typography variant="body2">{toggledToken.description}</Typography>
      </Card>
    </div>
  );
}

export default SetzTokens