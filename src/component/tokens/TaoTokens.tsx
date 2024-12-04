import { Button, IconButton, Tooltip } from "@mui/material";
import { ControlPoint, RemoveCircleOutline } from "@mui/icons-material";
import React, { useEffect } from "react";
import { IActionProps, usePlayerAction } from "../../app/hooks/actionHooks";
import { useAppSelector } from "../../app/hooks/storeHooks";
import { selectSettings } from "../../app/slices/settingsSlice";

function TaoTokens(props: IActionProps) {
  const player = props.player;
  const { character } = props.player;
  const { flipPanel } = useAppSelector(selectSettings)
  const { addToken, removeToken, setTokenCount, setTokenToggle, setTokenToggleAsList } = usePlayerAction(props);

  // 타오 토큰 활성화 조건
  useEffect(() => {
    const harmonyToggle = player.character.tokens[0].toggle;
    const yinCount = player.character.tokens[1].count;
    const yangCount = player.character.tokens[2].count;
    const yinToggle = player.character.tokens[1].toggle;
    const yangToggle = player.character.tokens[2].toggle;

    const payload: { [type: number]: boolean } = {};

    if (yinCount === 4 && yangCount === 4 && !harmonyToggle) {
      payload[0] = true;
      payload[1] = true;
      payload[2] = true;
    } else if ((yinCount! < 3 || yangCount! < 3) && harmonyToggle) {
      payload[0] = false;
    }

    if (!harmonyToggle && !(yinCount === 4 && yangCount === 4)) {
      if (yinCount! > yangCount! && (!yinToggle || yangToggle)) {
        payload[1] = true;
        payload[2] = false;
      } else if (yinCount! < yangCount! && (yinToggle || !yangToggle)) {
        payload[1] = false;
        payload[2] = true;
      } else if (yinCount === yangCount && (yinToggle || yangToggle)) {
        payload[1] = false;
        payload[2] = false;
      }
    }

    if (Object.keys(payload).length > 0) {
      setTokenToggleAsList(payload);
    }
  }, [character.tokens]);

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between" }}
      className={player.isFirst || !flipPanel ? "" : "reverseFlexRow"}>
      <div
        onClick={() => {
          if (character.tokens[0].toggle) {
            setTokenToggle({ index: 2, value: false });
            setTokenToggle({ index: 1, value: true });
          }
        }}
        style={{
          display: "grid",
          placeContent: "center"
        }}>
        <Tooltip title={character.tokens[1].description} placement={"top"}>
          <div style={{ position: "relative", display: "flex" }}>
            <img src={character.tokens[1].img} height={50} alt={character.tokens[1].img} />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                background: "black",
                width: "100%",
                height: "100%",
                opacity: player.character.tokens[1].toggle ? "0" : "0.6"
              }}></div>
          </div>
        </Tooltip>
      </div>
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
              opacity: player.character.tokens[0].toggle ? "0" : "0.6"
            }}></div>
        </div>
      </Tooltip>
      <div style={{ display: "grid", placeContent: "center", paddingLeft: 5, paddingRight: 5 }}>
        <IconButton onClick={() => addToken(2)}>
          <ControlPoint />
        </IconButton>
        <Button variant={"contained"} style={{ borderRadius: 50 }} onClick={() => setTokenCount(2, 0)}>
          {character.tokens[2].count} / {character.tokens[2].maxCount}
        </Button>
        <IconButton onClick={() => removeToken(2)}>
          <RemoveCircleOutline />
        </IconButton>
      </div>
      <div
        onClick={() => {
          if (character.tokens[0].toggle) {
            setTokenToggle({ index: 1, value: false });
            setTokenToggle({ index: 2, value: true });
          }
        }}
        style={{
          display: "grid",
          placeContent: "center"
        }}>
        <Tooltip title={character.tokens[2].description} placement={"top"}>
          <div style={{ position: "relative", height: 50 }}>
            <img src={character.tokens[2].img} height={50} alt={character.tokens[2].img} />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                background: "black",
                width: "100%",
                height: "100%",
                opacity: player.character.tokens[2].toggle ? "0" : "0.6"
              }}></div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default TaoTokens;
