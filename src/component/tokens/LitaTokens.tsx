import { TokensInterface, useToken } from "../../app/hooks/tokenHooks";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
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

  const getEnabledLegionTokens = useMemo(() => {
    return character.tokens.filter((token, index)=> token.toggle && index !== 4).map(token => token.name)
  }, [character.tokens])

  const getTokenImage = useMemo(() => {
    if (character.tokens[4].toggle) return character.tokens[0].img

    return character.tokens.find((token, index) => token.toggle && (index !== 0 && index !== 4))?.img
      ?? character.tokens[0].img
  }, [character.tokens])

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
        <img src={getTokenImage} height={116} alt={character.tokens[0].img} />
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
      <ToggleButtonGroup orientation={"vertical"} sx={{height:116.5}} value={getEnabledLegionTokens} size={"small"} color={"lita"}>
        <ToggleButton value={"축복-가디언"} onClick={() => litaToggleChange(1)}>가디언</ToggleButton>
        <ToggleButton value={"축복-어쌔신"} onClick={() => litaToggleChange(2)}>어쌔신</ToggleButton>
        <ToggleButton value={"축복-팔라딘"} onClick={() => litaToggleChange(3)}>팔라딘</ToggleButton>
      </ToggleButtonGroup>
      <div style={{ display: "grid", placeContent: "center" }}>
        <Tooltip title={character.tokens[4].description} placement={"top"}>
          <span>
            <Button size={"small"} sx={getLumenButtonStyle} onClick={handleAllToggle} disabled={player.currentHp > 1000}>
            <img src={character.tokens[4].img} alt={character.tokens[4].img} style={{ width: 60, height: 60 }} className={character.tokens[4].toggle ? "imageWhite" : ""} />
          </Button>
          </span>
        </Tooltip>
      </div>
    </div>
  );
}

export default LitaTokens;