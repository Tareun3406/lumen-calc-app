import { Button, ButtonGroup, Drawer, Grid2, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  decreaseFpToFirst,
  decreaseFpToSecond,
  deselectCharacter,
  increaseFpToFirst,
  increaseFpToSecond,
  initialize,
  resetFpToFirst,
  resetFpToSecond,
  selectFirstPlayer,
  selectSecondPlayer,
  selectDamageLogs, triggerPublish
} from "../features/board/boardSlice";
import HpBar from "../component/HpBar";
import { useEffect, useMemo, useRef, useState } from "react";
import { Person, Refresh, EditNote, Cable } from "@mui/icons-material";
import TokenDisplay from "../component/TokenDisplay";
import ButtonPanelProps from "../component/ButtonPanelProps";
import DamageLogs from "../component/DamageLogs";
import RemoteConnectDialog from "../component/RemoteConnectDialog";

function Play() {
  const firstPlayer = useAppSelector(selectFirstPlayer);
  const secondPlayer = useAppSelector(selectSecondPlayer);
  const damageLogs = useAppSelector(selectDamageLogs);
  const navigate = useNavigate();

  const [getTime, setTime] = useState(10);
  const [isTimerToggle, setTimerToggle] = useState(false);
  const [drawDamageLog, setDrawDamageLog] = useState(false);
  const [openRemoteDialog, setOpenRemoteDialog] = useState(false);
  const timerIntervalId = useRef<NodeJS.Timer>();
  const remoteButtonRef = useRef<HTMLButtonElement | null>(null);

  const dispatch = useAppDispatch();

  const handFirst = useMemo(() => {
    if (firstPlayer.currentHp <= 1000 && firstPlayer.character.name === "리타") return 10;
    if (firstPlayer.currentHp <= 2000) return 9;
    if (firstPlayer.currentHp <= 3000) return 8;
    if (firstPlayer.currentHp <= 4000) return 7;
    return 6;
  }, [firstPlayer.currentHp, firstPlayer.character.name]);
  const handSecond = useMemo(() => {
    if (secondPlayer.currentHp <= 1000 && secondPlayer.character.name === "리타") return 10;
    if (secondPlayer.currentHp <= 2000) return 9;
    if (secondPlayer.currentHp <= 3000) return 8;
    if (secondPlayer.currentHp <= 4000) return 7;
    return 6;
  }, [secondPlayer.currentHp, secondPlayer.character.name]);

  const timerColor = useMemo(() => {
    if (isTimerToggle) {
      if (getTime === 0) {
        return "error";
      }
      return "secondary";
    }
    return "info";
  }, [isTimerToggle, getTime]);

  const handleCloseRemoteDialog = () => {
    setOpenRemoteDialog(false);
  }
  const handleOpenRemoteDialog = () => {
    remoteButtonRef.current?.blur();
    setOpenRemoteDialog(true);
  }

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

  const toggleDamageLog = (toggle: boolean) => () => {
    setDrawDamageLog(toggle);
  }

  const handleIncreaseFp = (isFirst: boolean, value: number) => {
    if (isFirst) dispatch(increaseFpToFirst(value));
    else dispatch(increaseFpToSecond(value));
    dispatch(triggerPublish());
  }
  const handleDecreaseFp = (isFirst: boolean, value: number) => {
    if (isFirst) dispatch(decreaseFpToFirst(value));
    else dispatch(decreaseFpToSecond(value));
    dispatch(triggerPublish());
  }
  const handleResetFp = (isFirst: boolean) => {
    if (isFirst) dispatch(resetFpToFirst());
    else dispatch(resetFpToSecond());
    dispatch(triggerPublish());
  }

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);
  return (
    <Grid2 container padding={1}>

      <Grid2 size={4.5} display={"flex"} justifyContent={"space-between"} paddingX={2.5}>
        <img style={{ height: 31 }} src={firstPlayer.character.portrait} alt={firstPlayer.character.portrait} />
        <div style={{ display: "flex", alignItems: "center" }}>{firstPlayer.character.name}</div>
        <div></div>
      </Grid2>

      <Grid2 size={3} paddingBottom={0.5}>
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
          <Button ref={remoteButtonRef}>
            <Cable onClick={handleOpenRemoteDialog}/>
          </Button>
          <Button onClick={toggleDamageLog(true)}>
            <EditNote />
          </Button>
        </ButtonGroup>
      </Grid2>

      <Grid2 size={4.5} display={"flex"} justifyContent={"space-between"} paddingX={2.5}>
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
        <ButtonPanelProps player={firstPlayer}></ButtonPanelProps>
      </Grid2>

      <Grid2 size={4} display={"flex"} justifyContent={"space-between"}>
        <div style={{ display: "inline-block" }}></div>
        <div style={{ display: "inline-block", width: 72 }}>
          <IconButton onClick={() => handleIncreaseFp(true, 1)}>+</IconButton>
          <Button
            variant={firstPlayer.fp === 0 ? "outlined" : "contained"}
            fullWidth={true}
            color={getFpColor.first}
            onClick={() => handleResetFp(true)}>
            {firstPlayer.fp} fp
          </Button>
          <IconButton onClick={() => handleDecreaseFp(true, 1)}>-</IconButton>
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
          <IconButton onClick={() => handleIncreaseFp(false, 1)}>+</IconButton>
          <Button
            variant={secondPlayer.fp === 0 ? "outlined" : "contained"}
            fullWidth={true}
            color={getFpColor.second}
            onClick={() => handleResetFp(false)}>
            {secondPlayer.fp} fp
          </Button>
          <IconButton onClick={() => handleDecreaseFp(false, 1)}>-</IconButton>
        </div>
        <div style={{ display: "inline-block" }}></div>
      </Grid2>

      <Grid2 size={4}>
        <ButtonPanelProps player={secondPlayer}></ButtonPanelProps>
      </Grid2>



      <Grid2 size={6} display={"flex"} justifyContent={"center"}>
        <TokenDisplay player={firstPlayer}></TokenDisplay>
      </Grid2>

      <Grid2 size={6} display={"flex"} justifyContent={"center"}>
        <TokenDisplay player={secondPlayer}></TokenDisplay>
      </Grid2>



      <Drawer open={drawDamageLog} onClose={toggleDamageLog(false)} anchor="bottom">
        <DamageLogs damageLogs={damageLogs}></DamageLogs>
      </Drawer>
      <RemoteConnectDialog open={openRemoteDialog} handleClose={handleCloseRemoteDialog}></RemoteConnectDialog>
    </Grid2>
  );
}

export default Play;
