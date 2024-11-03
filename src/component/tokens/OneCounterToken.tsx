import { TokensInterface, useToken } from "./Token";
import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import { ControlPoint, RemoveCircleOutline } from "@mui/icons-material";

function OneCounterToken(props: TokensInterface) {
  const { player } = props;
  const { character } = player;
  const { addToken, removeToken, setTokenCount} = useToken(props);

  const getCounterToggle = useMemo(() => {
    if (character.tokens[0].count && character.tokens[0].toggleCount)
      return character.tokens[0].count >= character?.tokens[0]?.toggleCount;
  }, [character.tokens[0]]);

  const counterToken = (
    <div style={{ display: "grid", placeContent: "center", paddingLeft: 5, paddingRight: 5 }}>
      <IconButton onClick={() => addToken(0)}>
        <ControlPoint />
      </IconButton>
      <Button variant={"contained"} style={{ borderRadius: 50 }} onClick={() => setTokenCount(0, 0)}>
        {character.tokens[0].count} / {character.tokens[0].maxCount}
      </Button>
      <IconButton onClick={() => removeToken(0)}>
        <RemoveCircleOutline />
      </IconButton>
    </div>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {player.isFirst ? "" : counterToken}
      <Tooltip title={character.tokens[0].description} placement={"top"}>
        <div
          style={{
            display: "grid",
            placeContent: "center",
            position: "relative"
          }}>
          <img src={character.tokens[0].img} height={116} alt={character.tokens[0].img} />
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
      {player.isFirst ? counterToken : ""}
    </div>
  )
}

export default OneCounterToken;