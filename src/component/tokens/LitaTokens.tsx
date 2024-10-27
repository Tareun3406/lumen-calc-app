import { TokensInterface, useToken } from "./Token";
import { FormControlLabel, Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useMemo } from "react";

function LitaTokens(props: TokensInterface) {
  const { player } = props;
  const { character } = player;
  const { changeToggle, setTokenToggle } = useToken(props);


  const litaTogglesList = useMemo(() => {
    if (character.name !== "리타") return [];

    const tokens = character.tokens;
    const toggles = [];

    if (tokens[1].toggle || tokens[4].toggle) toggles.push(tokens[1].name);
    if (tokens[2].toggle || tokens[4].toggle) toggles.push(tokens[2].name);
    if (tokens[3].toggle || tokens[4].toggle) toggles.push(tokens[3].name);

    return toggles;
  }, [character.tokens])

  const litaToggleChange = (targetIndex: number) => {
    if (character.tokens[targetIndex].toggle) changeToggle(targetIndex);
    else {
      changeToggle(targetIndex);
      character.tokens.forEach((_token, index) => {
        if (index !== targetIndex && index !== 0) setTokenToggle({ index: index, value: false });
      });
    }
  }

  const litaSwitchHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      character.tokens.forEach((_token, index) => {
        if (index !== 0 ) setTokenToggle({ index: index, value: true });
      });
    } else {
      character.tokens.forEach((_token, index) => {
        if (index !== 0 ) setTokenToggle({ index: index, value: false });
      });
    }
  }
  
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}
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
      <div>
        <ToggleButtonGroup orientation={"vertical"} value={litaTogglesList} color={"primary"}>
          <ToggleButton size={"small"} value={"축복-팔라딘"} onClick={() => litaToggleChange(1)}>팔라딘</ToggleButton>
          <ToggleButton size={"small"} value={"축복-어쌔신"} onClick={() => litaToggleChange(2)}>어쌔신</ToggleButton>
          <ToggleButton size={"small"} value={"축복-가디언"} onClick={() => litaToggleChange(3)}>가디언</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
        <FormControlLabel control={<Switch onChange={litaSwitchHandle} checked={character.tokens[4].toggle} />}
                          label={"빛의 루멘"}
                          disabled={player.currentHp > 1000}
                          sx={{ marginLeft: 0, marginRight: 1 }}
                          className={player.isFirst ? "" : "reverseFlexRow"}
        />
      </div>
    </div>
  )
}

export default LitaTokens;