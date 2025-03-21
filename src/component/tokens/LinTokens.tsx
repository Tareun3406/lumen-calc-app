import { IActionProps, usePlayerAction } from "../../app/hooks/actionHooks";
import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import { ControlPoint, RemoveCircleOutline } from "@mui/icons-material";
import { useAppSelector } from "../../app/hooks/storeHooks";
import { selectSettings } from "../../app/slices/settingsSlice";
import { useTokenImageStyle } from "../../app/hooks/styleHooks";

function LinTokens(props: IActionProps) {
  const { player } = props;
  const { character } = player;
  const { addToken, removeToken, setTokenCount } = usePlayerAction(props);
  const { flipPanel } = useAppSelector(selectSettings);
  const { largeTokenStyle } = useTokenImageStyle();

  const getOpacity = useMemo(() => {
    if (!character.tokens[0].count) return 0.6

    if (character.tokens[0].count < 5) return 0.6
    else if (character.tokens[0].count < 9) return 0.3
    else return 0
  }, [character.tokens[0].count])

  const counterToken = (
    <div style={{ display: "grid", placeContent: "center", paddingLeft: 5, paddingRight: 5 }}>
      <IconButton onClick={() => addToken(0)}>
        <ControlPoint />
      </IconButton>
      <Button variant={"contained"} style={{ borderRadius: 50 }} onClick={() => setTokenCount(0, 0)}>
        {character.tokens[0].count} {character.tokens[0].maxCount! < 1000 && "/ " + character.tokens[0].maxCount}
      </Button>
      <IconButton onClick={() => removeToken(0)}>
        <RemoveCircleOutline />
      </IconButton>
    </div>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}
         className={player.isFirst || !flipPanel ? "" : "reverseFlexRow"}>
      <Tooltip title={character.tokens[0].description} placement={"top"}>
        <div
          style={{
            display: "grid",
            placeContent: "center",
            position: "relative"
          }}>
          <img src={character.tokens[0].img} style={largeTokenStyle} alt={character.tokens[0].img} />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              background: "black",
              width: "100%",
              height: "100%",
              opacity: getOpacity
            }}></div>
        </div>
      </Tooltip>
      {counterToken }
    </div>
  );
}

export default LinTokens;
