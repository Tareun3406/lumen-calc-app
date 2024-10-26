import { Button, ButtonGroup, Grid2, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import {
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
  resetFpToFirst,
  resetFpToSecond,
  selectFirstPlayer,
  selectSecondPlayer,
  setTokenToggleToFirst,
  setTokenToggleToSecond
} from "../features/board/boardSlice";
import HpBar from "../component/HpBar";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { Person, Refresh } from "@mui/icons-material";
import TokenDisplay from "../component/TokenDisplay";

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
        <TokenDisplay player={firstPlayer}></TokenDisplay>
      </Grid2>
      <Grid2 size={6} display={"flex"} justifyContent={"center"}>
        <TokenDisplay player={secondPlayer}></TokenDisplay>
      </Grid2>
    </Grid2>
  );
}

export default Play;
