import { Button, ButtonGroup, Drawer, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import {
  deselectCharacter,
  selectFirstPlayer,
  selectSecondPlayer,
  selectDamageLogs
} from "../app/slices/boardSlice";
import HpBar from "../component/HpBar";
import { useEffect, useMemo, useRef, useState } from "react";
import { Person, Refresh, EditNote, Cable } from "@mui/icons-material";
import TokenDisplay from "../component/TokenDisplay";
import ButtonPanelProps from "../component/ButtonPanelProps";
import DamageLogs from "../component/DamageLogs";
import { selectRemote, setShowRemoteDialog } from "../app/slices/remoteSlice";
import { useGlobalAction } from "../app/hooks/actionHooks";
import FpDisplay from "../component/FpDisplay";
import TimerDisplay from "../component/TimerDisplay";

function Play() {
  const firstPlayer = useAppSelector(selectFirstPlayer);
  const secondPlayer = useAppSelector(selectSecondPlayer);
  const damageLogs = useAppSelector(selectDamageLogs);
  const navigate = useNavigate();
  const { initializeBoard } = useGlobalAction()
  const { socketStatus, isPlayer } = useAppSelector(selectRemote);

  const [drawDamageLog, setDrawDamageLog] = useState(false);
  const remoteButtonRef = useRef<HTMLButtonElement | null>(null);

  const dispatch = useAppDispatch();

  const handleOpenRemoteDialog = () => {
    remoteButtonRef.current?.blur();
    dispatch(setShowRemoteDialog(true))
  }

  const toggleDamageLog = (toggle: boolean) => () => {
    setDrawDamageLog(toggle);
  }

  // todo HpBar 컴포넌트로 이동
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

  useEffect(() => {
    initializeBoard();
  }, []);
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
              if (!isPlayer && socketStatus === "CONNECTED") return;
              dispatch(deselectCharacter());
              navigate("/board/characterSelect");
            }}>
            <Person />
          </Button>
          <Button onClick={initializeBoard}>
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
        <FpDisplay player={firstPlayer} />
        <TimerDisplay />
        <FpDisplay player={secondPlayer} />
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
    </Grid2>
  );
}

export default Play;
