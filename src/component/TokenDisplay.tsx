import {
  addTokenToFirst,
  addTokenToSecond,
  changeTokenToggleToFirst,
  changeTokenToggleToSecond,
  PlayerState,
  removeTokenToFirst,
  removeTokenToSecond,
  setTokenCountToFirst,
  setTokenCountToSecond,
  setTokenToggleToFirst, setTokenToggleToSecond
} from "../features/board/boardSlice";
import { Button, IconButton } from "@mui/material";
import { ControlPoint, RemoveCircleOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

interface TokenDisplayProps {
  player: PlayerState;
}
function TokenDisplay(props: TokenDisplayProps) {
  const dispatch = useDispatch();
  const { player } = props;
  const { character, isFirst } = player;

  const changeToggle = (index: number) =>
    isFirst ? dispatch(changeTokenToggleToFirst(index)) : dispatch(changeTokenToggleToSecond(index));

  const addToken = (index: number) =>
    isFirst ? dispatch(addTokenToFirst(index)) : dispatch(addTokenToSecond(index));

  const removeToken = (index: number) =>
    isFirst ? dispatch(removeTokenToFirst(index)) : dispatch(removeTokenToSecond(index));

  const setTokenCount = (index: number, value: number) =>
    isFirst
      ? dispatch(setTokenCountToFirst({ index, value }))
      : dispatch(setTokenCountToSecond({ index, value }));

  const dispatchToken = (payload: { index: number; value: boolean }) =>
    isFirst ? dispatch(setTokenToggleToFirst(payload)) : dispatch(setTokenToggleToSecond(payload));

// 타오 토큰 활성화 조건
  useEffect(() => {
    const setTaoToken = () => {
      const harmonyToggle = player.character.tokens[0].toggle;
      const yinCount = player.character.tokens[1].count;
      const yangCount = player.character.tokens[2].count;

      if (yinCount === 4 && yangCount === 4 && !harmonyToggle) {
        dispatchToken({ index: 0, value: true });
        dispatchToken({ index: 1, value: true });
        dispatchToken({ index: 2, value: true });
      } else if (yinCount! < 3 || yangCount! < 3) {
        dispatchToken({ index: 0, value: false });
      }

      if (!harmonyToggle && (yinCount !== 4 || yangCount !== 4)) {
        if (yinCount! > yangCount!) {
          dispatchToken({ index: 1, value: true });
          dispatchToken({ index: 2, value: false });
        } else if (yinCount! < yangCount!) {
          dispatchToken({ index: 2, value: true });
          dispatchToken({ index: 1, value: false });
        } else {
          dispatchToken({ index: 1, value: false });
          dispatchToken({ index: 2, value: false });
        }
      }
    };

    if (character.name === "타오") {
      setTaoToken();
    }
  }, [character.tokens]);


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

  switch (character.name) {
    // 토글형 한개
    case "루트":
    case "니아":
    case "델피":
    case "레브":
    case "키스":
      return (
        <div>
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
        </div>
      );

    // 토글형 다수
    case "리타":
      return (
        <div>
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
        </div>
      );

    // 카운터 형 한가지
    case "울프":
    case "비올라":
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {player.isFirst ? "" : counterToken}
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
          {player.isFirst ? counterToken : ""}
        </div>
      );

    case "타오":
      return (
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className={player.isFirst ? "" : "reverseFlexRow"}>
          <div
            onClick={() => {
              if (character.tokens[0].toggle) {
                dispatchToken({ index: 2, value: false });
                dispatchToken({ index: 1, value: true });
              }
            }}
            style={{
              display: "grid",
              placeContent: "center"
            }}>
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
                dispatchToken({ index: 1, value: false });
                dispatchToken({ index: 2, value: true });
              }
            }}
            style={{
              display: "grid",
              placeContent: "center"
            }}>
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
          </div>
        </div>
      );
    default: return (<div></div>)
  }
}

export default TokenDisplay;