import { IActionProps, usePlayerAction } from "../../app/hooks/actionHooks";
import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import { ControlPoint, RemoveCircleOutline } from "@mui/icons-material";
import { useAppSelector } from "../../app/hooks/storeHooks";
import { selectSettings } from "../../app/slices/settingsSlice";
import { useTokenImageStyle } from "../../app/hooks/styleHooks";

function JoanTokens(props: IActionProps) {
  const { player } = props;
  const { character } = player;
  const { addToken, removeToken, setTokenCount, changeToggle } = usePlayerAction(props);
  const { flipPanel } = useAppSelector(selectSettings);
  const { largeTokenStyle, mediumTokenStyle, smallTokenStyle } = useTokenImageStyle();

  const getCounterToggle = useMemo(() => {
    if (character.tokens[0].count && character.tokens[0].toggleCount)
      return character.tokens[0].count >= character?.tokens[0]?.toggleCount;
  }, [character.tokens[0]]);

  const getDisasterClassName = useMemo(() => {
    if (character.tokens[1].toggle) {
      return "disasterOneActive"
    }
    return "disasterOneDeActive"
  }, [character.tokens[1].toggle])

  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      className={player.isFirst || !flipPanel ? "" : "reverseFlexRow"}>
        <Tooltip title={character.tokens[0].description} placement={"top"}>
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
                  opacity: getCounterToggle ? "0" : "0.6"
                }}></div>
            </div>
          </Tooltip>
        </Tooltip>
      <div style={{ display: "grid", placeContent: "center", paddingLeft: 5, paddingRight: 5 }}>
        <IconButton onClick={() => addToken(0)}>
          <ControlPoint />
        </IconButton>
        <Button variant={"contained"} style={{ borderRadius: 50 }} onClick={() => setTokenCount(0, 2)}>
          {character.tokens[0].count} {character.tokens[0].maxCount! < 1000 && "/ " + character.tokens[0].maxCount}
        </Button>
        <IconButton onClick={() => removeToken(0)}>
          <RemoveCircleOutline />
        </IconButton>
      </div>
      <div style={{ placeContent: "center" }}>
        <Tooltip title={character.tokens[1].description} placement={"top"}>
          <div style={{ position: "relative", display: "flex" }} onClick={() => changeToggle(1)}>
            <img src={character.tokens[1].img} style={{height: mediumTokenStyle.height}} alt={character.tokens[1].img} className={getDisasterClassName} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default JoanTokens;
