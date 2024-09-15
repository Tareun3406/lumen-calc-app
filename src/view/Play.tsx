import { Button, ButtonGroup, Grid2, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import {
  addTokenToFirst,
  addTokenToSecond,
  changeTokenToggleToFirst,
  changeTokenToggleToSecond,
  damageToFirst,
  damageToSecond,
  decreaseFpToFirst,
  decreaseFpToSecond,
  deselectCharacter,
  healToFirst,
  healToSecond,
  increaseFpToFirst,
  increaseFpToSecond,
  initialize,
  PlayerState,
  removeTokenToFirst,
  removeTokenToSecond,
  resetFpToFirst,
  resetFpToSecond,
  selectFirstPlayer,
  selectSecondPlayer,
  setTokenCountToFirst,
  setTokenCountToSecond,
  setTokenToggleToFirst,
  setTokenToggleToSecond
} from "../features/board/boardSlice";
import HpBar from "./component/HpBar";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { ControlPoint, Person, Refresh, RemoveCircleOutline } from "@mui/icons-material";
import { Character } from "../features/Characters";

function Play() {
  const firstPlayer = useAppSelector(selectFirstPlayer);
  const secondPlayer = useAppSelector(selectSecondPlayer);
  const navigate = useNavigate();

  const [getTime, setTime] = useState(10);
  const [isTimerToggle, setTimerToggle] = useState(false);
  const timerIntervalId = useRef<NodeJS.Timer>();

  const dispatch = useDispatch();

  const buttonStyle = {
    width: 70
  };

  const handFirst = useMemo(() => {
    if (firstPlayer.currentHp <= 2000) return 9;
    if (firstPlayer.currentHp <= 3000) return 8;
    if (firstPlayer.currentHp <= 4000) return 7;
    return 6;
  }, [firstPlayer.currentHp]);
  const handSecond = useMemo(() => {
    if (secondPlayer.currentHp <= 2000) return 9;
    if (secondPlayer.currentHp <= 3000) return 8;
    if (secondPlayer.currentHp <= 4000) return 7;
    return 6;
  }, [secondPlayer.currentHp]);

  const timerColor = useMemo(() => {
    if (isTimerToggle) {
      if (getTime === 0) {
        return "error";
      }
      return "secondary";
    }
    return "info";
  }, [isTimerToggle, getTime]);

  const handleTimerButton = () => {
    if (isTimerToggle) {
      setTime(10);
      clearInterval(timerIntervalId.current);
    } else {
      timerIntervalId.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerIntervalId.current);
            setTimerToggle(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    setTimerToggle(!isTimerToggle);
  };

  const changeToggle = (player: PlayerState, index: number) =>
    player.isFirst ? dispatch(changeTokenToggleToFirst(index)) : dispatch(changeTokenToggleToSecond(index));

  const addToken = (player: PlayerState, index: number) =>
    player.isFirst ? dispatch(addTokenToFirst(index)) : dispatch(addTokenToSecond(index));

  const removeToken = (player: PlayerState, index: number) =>
    player.isFirst ? dispatch(removeTokenToFirst(index)) : dispatch(removeTokenToSecond(index));

  const setTokenCount = (player: PlayerState, index: number, value: number) =>
    player.isFirst
      ? dispatch(setTokenCountToFirst({ index, value }))
      : dispatch(setTokenCountToSecond({ index, value }));

  const getFpColor = useMemo(() => {
    const getColor = (fp: number): "success" | "info" | "error" => {
      if (fp > 0) return "info";
      if (fp < 0) return "error";
      return "success";
    };

    const first = getColor(firstPlayer.fp);
    const second = getColor(secondPlayer.fp);
    return {
      first,
      second
    };
  }, [firstPlayer.fp, secondPlayer.fp]);

  // 비올라 울프 토큰 활성화 조건 (카운터 한개)
  useEffect(() => {
    const firstTokens = firstPlayer.character.tokens;
    const secondTokens = secondPlayer.character.tokens;

    firstTokens.forEach((token, index) => {
      if (token.type === "counter" && token.toggleCount) {
        if (token.count! >= token.toggleCount) dispatch(setTokenToggleToFirst({ index, value: true }));
        else dispatch(setTokenToggleToFirst({ index, value: false }));
      }
    });

    secondTokens.forEach((token, index) => {
      if (token.type === "counter" && token.toggleCount) {
        if (token.count! >= token.toggleCount) dispatch(setTokenToggleToSecond({ index, value: true }));
        else dispatch(setTokenToggleToSecond({ index, value: false }));
      }
    });
  }, [firstPlayer.character.tokens, secondPlayer.character.tokens]);

  const dispatchToken = (isFirst: boolean, payload: { index: number; value: boolean }) => {
    if (isFirst) dispatch(setTokenToggleToFirst(payload));
    else dispatch(setTokenToggleToSecond(payload));
  };

  // 타오 토큰 활성화 조건
  useEffect(() => {
    const setTaoToken = (isFirst: boolean) => {
      const player = isFirst ? firstPlayer : secondPlayer;
      const harmonyToggle = player.character.tokens[0].toggle;
      const yinCount = player.character.tokens[1].count;
      const yangCount = player.character.tokens[2].count;

      if (yinCount === 4 && yangCount === 4 && !harmonyToggle) {
        dispatchToken(isFirst, { index: 0, value: true });
        dispatchToken(isFirst, { index: 1, value: true });
        dispatchToken(isFirst, { index: 2, value: true });
      } else if (yinCount! < 3 || yangCount! < 3) {
        dispatchToken(isFirst, { index: 0, value: false });
      }

      if (!harmonyToggle && (yinCount !== 4 || yangCount !== 4)) {
        if (yinCount! > yangCount!) {
          dispatchToken(isFirst, { index: 1, value: true });
          dispatchToken(isFirst, { index: 2, value: false });
        } else if (yinCount! < yangCount!) {
          dispatchToken(isFirst, { index: 2, value: true });
          dispatchToken(isFirst, { index: 1, value: false });
        } else {
          dispatchToken(isFirst, { index: 1, value: false });
          dispatchToken(isFirst, { index: 2, value: false });
        }
      }
    };

    if (firstPlayer.character.name === "타오") {
      setTaoToken(true);
    }
    if (secondPlayer.character.name === "타오") {
      setTaoToken(false);
    }
  }, [firstPlayer.character.tokens, secondPlayer.character.tokens]);

  const getToken = (character: Character, player: PlayerState) => {
    const counterToken = (
      <div style={{ display: "grid", placeContent: "center", paddingLeft: 5, paddingRight: 5 }}>
        <IconButton onClick={() => addToken(player, 0)}>
          <ControlPoint />
        </IconButton>
        <Button variant={"contained"} style={{ borderRadius: 50 }} onClick={() => setTokenCount(player, 0, 0)}>
          {character.tokens[0].count} / {character.tokens[0].maxCount}
        </Button>
        <IconButton onClick={() => removeToken(player, 0)}>
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
            <span style={{ position: "relative", display: "inline-flex" }} onClick={() => changeToggle(player, 0)}>
              <img src={character.tokens[0].img} height={120} alt={character.tokens[0].img} />
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
            </span>
          </div>
        );

      // 토글형 다수
      case "리타":
        return (
          <div>
            <span style={{ position: "relative", display: "inline-flex" }} onClick={() => changeToggle(player, 0)}>
              <img src={character.tokens[0].img} height={120} alt={character.tokens[0].img} />
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
            </span>
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
                  dispatchToken(player.isFirst, { index: 2, value: false });
                  dispatchToken(player.isFirst, { index: 1, value: true });
                }
              }}
              style={{
                display: "grid",
                placeContent: "center"
              }}>
              <div style={{ position: "relative" }}>
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
              <IconButton onClick={() => addToken(player, 1)}>
                <ControlPoint />
              </IconButton>
              <Button variant={"contained"} style={{ borderRadius: 50 }} onClick={() => setTokenCount(player, 1, 0)}>
                {character.tokens[1].count} / {character.tokens[1].maxCount}
              </Button>
              <IconButton onClick={() => removeToken(player, 1)}>
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
              <IconButton onClick={() => addToken(player, 2)}>
                <ControlPoint />
              </IconButton>
              <Button variant={"contained"} style={{ borderRadius: 50 }} onClick={() => setTokenCount(player, 2, 0)}>
                {character.tokens[2].count} / {character.tokens[2].maxCount}
              </Button>
              <IconButton onClick={() => removeToken(player, 2)}>
                <RemoveCircleOutline />
              </IconButton>
            </div>
            <div
              onClick={() => {
                if (character.tokens[0].toggle) {
                  dispatchToken(player.isFirst, { index: 1, value: false });
                  dispatchToken(player.isFirst, { index: 2, value: true });
                }
              }}
              style={{
                display: "grid",
                placeContent: "center"
              }}>
              <div style={{ position: "relative" }}>
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
    }
  };
  // counter(3, 5, 2*4) , toggle,
  return (
    <Grid2 container padding={1}>
      <Grid2 size={5.25} display={"flex"} justifyContent={"space-between"} paddingX={2.5}>
        <img style={{ height: 31 }} src={firstPlayer.character.portrait} alt={firstPlayer.character.portrait} />
        <div style={{ display: "flex", alignItems: "center" }}>{firstPlayer.character.name}</div>
        <div></div>
      </Grid2>
      <Grid2 size={1.5}>
        <ButtonGroup variant={"outlined"} size={"small"}>
          <Button
            onClick={() => {
              dispatch(deselectCharacter());
              navigate("/board/characterSelect");
            }}>
            <Person />
          </Button>
          <Button onClick={() => dispatch(initialize())}>
            <Refresh />
          </Button>
        </ButtonGroup>
      </Grid2>
      <Grid2 size={5.25} display={"flex"} justifyContent={"space-between"} paddingX={2.5}>
        <div></div>
        <div style={{ display: "flex", alignItems: "center" }}>{secondPlayer.character.name}</div>
        <img style={{ height: 31 }} src={secondPlayer.character.portrait} alt={secondPlayer.character.portrait} />
      </Grid2>
      <Grid2 size={6} paddingLeft={4} paddingRight={6} position={"relative"}>
        <HpBar player={firstPlayer} />
        <span style={{ position: "absolute", top: 3, right: 70 }}>{firstPlayer.currentHp}</span>
        <span style={{ position: "absolute", top: 3, left: 70 }}>Hand: {handFirst}</span>
      </Grid2>
      <Grid2 size={6} paddingLeft={6} paddingRight={4} position={"relative"}>
        <HpBar player={secondPlayer} />
        <span style={{ position: "absolute", top: 3, left: 70 }}>{secondPlayer.currentHp}</span>
        <span style={{ position: "absolute", top: 3, right: 70 }}>Hand: {handSecond}</span>
      </Grid2>

      <Grid2 size={4}>
        <Stack spacing={1} padding={1} paddingLeft={3}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(100))}>
              -100
            </Button>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(200))}>
              -200
            </Button>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(300))}>
              -300
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(400))}>
              -400
            </Button>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(500))}>
              -500
            </Button>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(600))}>
              -600
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(700))}>
              -700
            </Button>
            <Button
              variant={"contained"}
              size={"medium"}
              color={"error"}
              sx={buttonStyle}
              onClick={() => dispatch(damageToFirst(1000))}>
              -1000
            </Button>
            <Button
              variant={"contained"}
              size={"medium"}
              color={"success"}
              sx={buttonStyle}
              onClick={() => dispatch(healToFirst(100))}>
              +100
            </Button>
          </div>
        </Stack>
      </Grid2>
      <Grid2 size={4} display={"flex"} justifyContent={"space-between"}>
        <div style={{ display: "inline-block" }}></div>
        <div style={{ display: "inline-block", width: 72 }}>
          <IconButton onClick={() => dispatch(increaseFpToFirst(1))}>+</IconButton>
          <Button
            variant={firstPlayer.fp == 0 ? "outlined" : "contained"}
            fullWidth={true}
            color={getFpColor.first}
            onClick={() => dispatch(resetFpToFirst())}>
            {firstPlayer.fp} fp
          </Button>
          <IconButton onClick={() => dispatch(decreaseFpToFirst(1))}>-</IconButton>
        </div>
        <Button
          variant={"contained"}
          size={"large"}
          style={{ borderRadius: 50, fontSize: 45, width: 90 }}
          color={timerColor}
          onClick={handleTimerButton}>
          {getTime}
        </Button>
        <div style={{ display: "inline-block", width: 72 }}>
          <IconButton onClick={() => dispatch(increaseFpToSecond(1))}>+</IconButton>
          <Button
            variant={secondPlayer.fp == 0 ? "outlined" : "contained"}
            fullWidth={true}
            color={getFpColor.second}
            onClick={() => dispatch(resetFpToSecond())}>
            {secondPlayer.fp} fp
          </Button>
          <IconButton onClick={() => dispatch(decreaseFpToSecond(1))}>-</IconButton>
        </div>
        <div style={{ display: "inline-block" }}></div>
      </Grid2>
      <Grid2 size={4}>
        <Stack padding={1} paddingRight={3} spacing={1}>
          <div style={{ display: "flex", justifyContent: "space-between" }} className={"reverseFlexRow"}>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(100))}>
              -100
            </Button>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(200))}>
              -200
            </Button>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(300))}>
              -300
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }} className={"reverseFlexRow"}>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(400))}>
              -400
            </Button>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(500))}>
              -500
            </Button>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(600))}>
              -600
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }} className={"reverseFlexRow"}>
            <Button variant={"outlined"} size={"medium"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(700))}>
              -700
            </Button>
            <Button
              variant={"contained"}
              size={"medium"}
              color={"error"}
              sx={buttonStyle}
              onClick={() => dispatch(damageToSecond(1000))}>
              -1000
            </Button>
            <Button
              variant={"contained"}
              color={"success"}
              size={"medium"}
              sx={buttonStyle}
              onClick={() => dispatch(healToSecond(100))}>
              +100
            </Button>
          </div>
        </Stack>
      </Grid2>
      <Grid2 size={6} display={"flex"} justifyContent={"center"}>
        {getToken(firstPlayer.character, firstPlayer)}
      </Grid2>
      <Grid2 size={6} display={"flex"} justifyContent={"center"}>
        {getToken(secondPlayer.character, secondPlayer)}
      </Grid2>
    </Grid2>
  );
}

export default Play;
