import { IActionProps, usePlayerAction } from "../../app/hooks/actionHooks";
import { Button, IconButton, Tooltip } from "@mui/material";
import { ControlPoint, RemoveCircleOutline } from "@mui/icons-material";
import React from "react";
import { useAppSelector } from "../../app/hooks/storeHooks";
import { selectSettings } from "../../app/slices/settingsSlice";
import { useTokenImageStyle } from "../../app/hooks/styleHooks";

function LevTokens(props: IActionProps) {
  const { player } = props;
  const { character } = player;
  const { addToken, setTokenCount, removeToken, changeToggle, damageToOther } = usePlayerAction(props);
  const { largeTokenStyle, mediumTokenStyle } = useTokenImageStyle();
  const { flipPanel } = useAppSelector(selectSettings);

  const handleDaggerClick = () => {
    if (character.tokens[1].count && character.tokens[1].count < 3) return;
    const damage = getDaggerDamage();
    damageToOther(damage)
    setTokenCount(1, 0);
  };

  const getDaggerDamage = () => {
    if (!player.character.tokens[1].count) return 0;
    return Math.floor(player.character.tokens[1].count / 3) * 200;
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between" }}
      className={player.isFirst || !flipPanel ? "" : "reverseFlexRow"}>
      <Tooltip title={character.tokens[0].description} placement={"top"}>
        <div style={{ position: "relative", display: "flex" }} onClick={() => changeToggle(0)}>
          <img src={character.tokens[0].img} style={largeTokenStyle} alt={character.tokens[0].img} />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              background: "black",
              width: "100%",
              height: "100%",
              opacity: player.character.tokens[0].toggle ? "0" : "0.6"
            }}></div>
        </div>
      </Tooltip>
      <div style={{ display: "grid", placeContent: "center", paddingLeft: 5, paddingRight: 5 }}>
        <IconButton onClick={() => addToken(1)}>
          <ControlPoint />
        </IconButton>
        <Button variant={"contained"} style={{ borderRadius: 50 }} onClick={() => setTokenCount(1, 0)}>
          {character.tokens[1].count} / {character.tokens[1].maxCount}
        </Button>
        <IconButton onClick={() => removeToken(1)}>
          <RemoveCircleOutline />
        </IconButton>
      </div>
      <div
        style={{
          display: "grid",
          placeContent: "center"
        }}>
        <Tooltip title={character.tokens[1].description} placement={"top"}>
          <div style={{ position: "relative", display: "flex" }} onClick={handleDaggerClick}>
            <img src={character.tokens[1].img} style={mediumTokenStyle} alt={character.tokens[1].img} />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                background: "black",
                width: "100%",
                height: "100%",
                opacity: player.character.tokens[1].count && player.character.tokens[1].count >= 3 ? "0" : "0.6"
              }}></div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default LevTokens;
