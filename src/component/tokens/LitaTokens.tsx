import { TokensInterface, useToken } from "./Token";
import {
  Button,
  Grid2,
  Tooltip
} from "@mui/material";
import React, { useMemo } from "react";
import { grey, yellow } from "@mui/material/colors";

function LitaTokens(props: TokensInterface) {
  const { player } = props;
  const { character } = player;
  const { changeToggle, setTokenToggleAsList } = useToken(props);

  const litaToggleChange = (targetIndex: number) => {
    if (character.tokens[4].toggle) return;
    if (character.tokens[targetIndex].toggle) changeToggle(targetIndex);
    else {
      const payload = {
        1: targetIndex === 1,
        2: targetIndex === 2,
        3: targetIndex === 3
      };
      setTokenToggleAsList(payload);
    }
  };

  const handleAllToggle = () => {
    if (character.tokens[4].toggle) {
      const payload = {
        1: false,
        2: false,
        3: false,
        4: false
      }
      setTokenToggleAsList(payload);
    } else {
      const payload = {
        1: true,
        2: true,
        3: true,
        4: true
      }
      setTokenToggleAsList(payload);
    }
  };

  const renderLegions = (tokenIndex: number) => (
    <Tooltip title={character.tokens[tokenIndex].description} placement={tokenIndex === 1 ? "top" : "bottom"}>
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
    </Tooltip>
  );

  const getLumenButtonStyle = useMemo(() => {
    if (player.currentHp > 1000) {
      return {
        border: "solid 1px",
        backgroundColor: grey[400],
        borderColor: grey[600],
        borderRadius: 50
      }
    }
    if (!character.tokens[4].toggle) {
      return {
        border: "solid 1px",
        borderRadius: 50,
        borderColor: yellow["600"],
        backgroundColor: "white",
      }
    }
    return {
      border: "solid 1px",
      borderRadius: 50,
      borderColor: yellow["600"],
      backgroundColor: yellow["600"],
    }

  }, [player.currentHp, !character.tokens[4].toggle])

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
      className={player.isFirst ? "" : "reverseFlexRow"}>

      <Tooltip title={character.tokens[0].description} placement={"top"}>
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
      </Tooltip>
      <div style={{ display: "grid", placeContent: "center" }}>
        <Tooltip title={character.tokens[4].description} placement={"top"}>
          <span>
            <Button size={"small"} sx={getLumenButtonStyle} onClick={handleAllToggle} disabled={player.currentHp > 1000}>
            <img src={character.tokens[4].img} alt={character.tokens[4].img} style={{ width: 60, height: 60 }} className={character.tokens[4].toggle ? "imageWhite" : ""} />
          </Button>
          </span>
        </Tooltip>
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