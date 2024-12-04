import { Tooltip } from "@mui/material";
import React from "react";
import { IActionProps, usePlayerAction } from "../../app/hooks/actionHooks";

function OneToggleToken(props: IActionProps) {
  const { player } = props;
  const { character } = player;
  const { changeToggle } = usePlayerAction(props);

  return (
    <div>
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
              opacity: player.character.tokens[0].toggle ? "0" : "0.6"
            }}></div>
        </div>
      </Tooltip>
    </div>
  )
}

export default OneToggleToken;