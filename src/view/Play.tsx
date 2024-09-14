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
  healToFirst,
  healToSecond,
  increaseFpToFirst,
  increaseFpToSecond,
  initialize,
  PlayerState,
  removeTokenToFirst,
  removeTokenToSecond,
  selectFirstPlayer,
  selectSecondPlayer
} from "../features/board/boardSlice";
import HpBar from "./component/HpBar";
import { useDispatch } from "react-redux";
import { useMemo, useRef, useState } from "react";
import { ControlPoint, Home, Person, Refresh, RemoveCircleOutline } from "@mui/icons-material";
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
      return "success";
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

  const getToken = (character: Character, player: PlayerState) => {
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
              <img src={character.tokens[0].img} height={120} />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  background: "black",
                  width: "100%",
                  height: "100%",
                  opacity: player.character.tokens[0].toggle ? "0" : "0.4"
                }}></div>
            </span>
          </div>
        );

      // 토글형 다수
      case "리타":
        return;
      // 카운터 형 한가지
      case "울프":
      case "비올라":
        return (
          <div>
            <div>
              <img src={character.tokens[0].img} height={80} />
            </div>
            <div style={{ fontSize: 20 }}>
              <IconButton onClick={() => removeToken(player, 0)}>
                <RemoveCircleOutline />
              </IconButton>
              <text>
                {character.tokens[0].count} / {character.tokens[0].maxCount}
              </text>
              <IconButton onClick={() => addToken(player, 0)}>
                <ControlPoint />
              </IconButton>
            </div>
          </div>
        );

      // 카운터 형 다수
      case "타오":
        return character.tokens.map((token, index) => {
          return (
            <div style={{ display: "inline-block" }} key={index}>
              <div>
                <img src={token.img} height={80} alt={token.img} />
              </div>
              <div style={{ fontSize: 20 }}>
                <IconButton onClick={() => removeToken(player, 0)}>
                  <RemoveCircleOutline />
                </IconButton>
                <text>
                  {token.count} / {token.maxCount}
                </text>
                <IconButton onClick={() => addToken(player, 0)}>
                  <ControlPoint />
                </IconButton>
              </div>
            </div>
          );
        });
    }
  };
  // counter(3, 5, 2*4) , toggle,
  return (
    <Grid2 container padding={1}>
      <Grid2 size={4.5}>{firstPlayer.character.name}</Grid2>
      <Grid2 size={3}>
        <ButtonGroup variant={"outlined"}>
          <Button onClick={() => navigate("/")}>
            <Home />
          </Button>
          <Button onClick={() => navigate("/board/characterSelect")}>
            <Person />
          </Button>
          <Button onClick={() => dispatch(initialize())}>
            <Refresh />
          </Button>
        </ButtonGroup>
      </Grid2>
      <Grid2 size={4.5}>{secondPlayer.character.name}</Grid2>
      <Grid2 size={6} paddingLeft={4} paddingRight={6} marginTop={1} position={"relative"}>
        <HpBar targetPlayer="first" player={firstPlayer} />
        <text style={{ position: "absolute", top: 3, right: 70 }}>{firstPlayer.currentHp}</text>
        <text style={{ position: "absolute", top: 3, left: 70 }}>Hand: {handFirst}</text>
      </Grid2>
      <Grid2 size={6} paddingLeft={6} paddingRight={4} marginTop={1} position={"relative"}>
        <HpBar targetPlayer="second" player={secondPlayer} />
        <text style={{ position: "absolute", top: 3, left: 70 }}>{secondPlayer.currentHp}</text>
        <text style={{ position: "absolute", top: 3, right: 70 }}>Hand: {handSecond}</text>
      </Grid2>

      <Grid2 size={4}>
        <Stack spacing={1} padding={1} paddingLeft={3}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(100))}>
              -100
            </Button>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(200))}>
              -200
            </Button>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(300))}>
              -300
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(400))}>
              -400
            </Button>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(500))}>
              -500
            </Button>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(600))}>
              -600
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToFirst(700))}>
              -700
            </Button>
            <Button
              variant={"contained"}
              size={"large"}
              color={"error"}
              sx={buttonStyle}
              onClick={() => dispatch(damageToFirst(1000))}>
              -1000
            </Button>
            <Button
              variant={"contained"}
              size={"large"}
              color={"success"}
              sx={buttonStyle}
              onClick={() => dispatch(healToFirst(100))}>
              +100
            </Button>
          </div>
        </Stack>
      </Grid2>
      <Grid2 size={4} paddingX={1}>
        <div style={{ display: "inline-block", width: 62 }}>
          <IconButton onClick={() => dispatch(increaseFpToFirst(1))}>+</IconButton>
          <Button variant={"outlined"}>{firstPlayer.fp}</Button>
          <IconButton onClick={() => dispatch(decreaseFpToFirst(1))}>-</IconButton>
        </div>
        <Button
          variant={"contained"}
          size={"large"}
          style={{ borderRadius: 50, fontSize: 45, width: 95, margin: 10 }}
          color={timerColor}
          onClick={handleTimerButton}>
          {getTime}
        </Button>
        <div style={{ display: "inline-block", width: 62 }}>
          <IconButton onClick={() => dispatch(increaseFpToSecond(1))}>+</IconButton>
          <Button variant={"outlined"}>{secondPlayer.fp}</Button>
          <IconButton onClick={() => dispatch(decreaseFpToSecond(1))}>-</IconButton>
        </div>
      </Grid2>
      <Grid2 size={4}>
        <Stack padding={1} paddingRight={3} spacing={1}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(100))}>
              -100
            </Button>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(200))}>
              -200
            </Button>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(300))}>
              -300
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(400))}>
              -400
            </Button>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(500))}>
              -500
            </Button>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(600))}>
              -600
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={"outlined"} size={"large"} sx={buttonStyle} onClick={() => dispatch(damageToSecond(700))}>
              -700
            </Button>
            <Button
              variant={"contained"}
              size={"large"}
              color={"error"}
              sx={buttonStyle}
              onClick={() => dispatch(damageToSecond(1000))}>
              -1000
            </Button>
            <Button
              variant={"contained"}
              color={"success"}
              size={"large"}
              sx={buttonStyle}
              onClick={() => dispatch(healToSecond(100))}>
              +100
            </Button>
          </div>
        </Stack>
      </Grid2>
      <Grid2 size={6} paddingTop={2}>
        {getToken(firstPlayer.character, firstPlayer)}
      </Grid2>
      <Grid2 size={6} paddingTop={2}>
        {getToken(secondPlayer.character, secondPlayer)}
      </Grid2>
    </Grid2>
  );
}

export default Play;
