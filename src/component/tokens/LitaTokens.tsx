import { TokensInterface, useToken } from "./Token";
import { FormControlLabel, Grid2, IconButton, Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useMemo, useState } from "react";

function LitaTokens(props: TokensInterface) {
  const { player } = props;
  const { character } = player;
  const { changeToggle, setTokenToggle } = useToken(props);

  const [lumenOn, setLumenOn] = useState(false);

  // const litaTogglesList = useMemo(() => {
  //   if (character.name !== "리타") return [];
  //
  //   const tokens = character.tokens;
  //   const toggles = [];
  //
  //   if (tokens[1].toggle || tokens[4].toggle) toggles.push(tokens[1].name);
  //   if (tokens[2].toggle || tokens[4].toggle) toggles.push(tokens[2].name);
  //   if (tokens[3].toggle || tokens[4].toggle) toggles.push(tokens[3].name);
  //
  //   return toggles;
  // }, [character.tokens]);

  const litaToggleChange = (targetIndex: number) => {
    if (character.tokens[targetIndex].toggle) changeToggle(targetIndex);
    else {
      changeToggle(targetIndex);
      character.tokens.forEach((_token, index) => {
        if (index !== targetIndex && index !== 0) setTokenToggle({ index: index, value: false });
      });
    }
  };

  const handleAllToggle = () => {
    if (character.tokens[4].toggle) {
      character.tokens.forEach((_token, index) => {
        if (index !== 0) setTokenToggle({ index: index, value: false });
      });
    } else {
      character.tokens.forEach((_token, index) => {
        if (index !== 0) setTokenToggle({ index: index, value: true });
      });
    }
  };

  const renderLegions = (tokenIndex: number) => (
    <div
      style={{ position: "relative", display: "flex", justifyContent: "center" }}
      onClick={() => litaToggleChange(tokenIndex)}>
      <img src={character.tokens[tokenIndex].img} alt={character.tokens[tokenIndex].img} style={{ width: 55, height: 55 }} />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          background: "black",
          width: 55,
          height: "100%",
          opacity: player.character.tokens[tokenIndex].toggle ? "0" : "0.6"
        }}></div>
    </div>
  );

  const getLumenButtonStyle = useMemo(() => {
    if (player.currentHp > 1000) {
      return {
        backgroundColor: "gray"
      }
    }
    if (!lumenOn) {
      return {
        backgroundColor: "white",
        border: "yellow",
      }
    }
    return {
      backgroundColor: "yellow",
    }

  }, [])

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
      className={player.isFirst ? "" : "reverseFlexRow"}>
      <div style={{ position: "relative", display: "flex" }} onClick={() => changeToggle(0)}>
        <img src={character.tokens[0].img} height={116} alt={character.tokens[0].img} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            background: "black",
            width: "100%",
            height: "100%",
            opacity: !player.character.tokens[0].toggle ? "0" : "0.6"
          }}></div>
      </div>
      <div style={{ display: "grid", placeContent: "center" }}>
        <IconButton size={"small"} sx={getLumenButtonStyle} onClick={handleAllToggle} >
          <img src={character.tokens[4].img} alt={character.tokens[4].img} style={{ width: 60, height: 60 }} />
        </IconButton>
      </div>
      <Grid2 container width={120}>
        <Grid2 size={12}>
          {renderLegions(1)}
        </Grid2>
        <Grid2 size={6}>
          {renderLegions(2)}
        </Grid2>
        <Grid2 size={6}>
          {renderLegions(3)}
        </Grid2>
      </Grid2>
    </div>
  );
}

export default LitaTokens;