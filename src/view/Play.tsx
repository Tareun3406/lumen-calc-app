import { Button, ButtonGroup, Drawer, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import { selectFirstPlayer, selectSecondPlayer, selectDamageLogs } from "../app/slices/boardSlice";
import HpBar from "../component/HpBar";
import { useEffect, useMemo, useRef, useState } from "react";
import { Person, Refresh, EditNote, Cable, Settings } from "@mui/icons-material";
import TokenDisplay from "../component/TokenDisplay";
import ButtonPanelProps from "../component/ButtonPanelProps";
import DamageLogs from "../component/DamageLogs";
import { selectRemote, setShowRemoteDialog } from "../app/slices/remoteSlice";
import { useGlobalAction } from "../app/hooks/actionHooks";
import FpDisplay from "../component/FpDisplay";
import GetTimerDisplay from "../component/GetTimerDisplay";
import { setOpenSettingsDialog } from "../app/slices/dialogSlice";

function Play() {
  const firstPlayer = useAppSelector(selectFirstPlayer);
  const secondPlayer = useAppSelector(selectSecondPlayer);
  const damageLogs = useAppSelector(selectDamageLogs);
  const navigate = useNavigate();
  const { initializeBoard } = useGlobalAction();
  const { socketStatus, hasControl } = useAppSelector(selectRemote);

  const [drawDamageLog, setDrawDamageLog] = useState(false);
  const remoteButtonRef = useRef<HTMLButtonElement | null>(null);
  const settingsButtonRef = useRef<HTMLButtonElement | null>(null);

  const dispatch = useAppDispatch();

  const handleOpenRemoteDialog = () => {
    remoteButtonRef.current?.blur();
    dispatch(setShowRemoteDialog(true));
  };
  const handleOpenSettingsDialog = () => {
    settingsButtonRef.current?.blur();
    dispatch(setOpenSettingsDialog(true));
  }

  const toggleDamageLog = (toggle: boolean) => () => {
    setDrawDamageLog(toggle);
  };

  // todo HpBar 컴포넌트로 이동
  const handFirst = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_hp, hand] = firstPlayer.character.hp.hpHand.find(([hp]) => firstPlayer.currentHp < hp) ?? [5000, 6]
    return hand;

  }, [firstPlayer.currentHp, firstPlayer.character]);

  const handSecond = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_hp, hand] = secondPlayer.character.hp.hpHand.find(([hp]) => secondPlayer.currentHp < hp) ?? [5000, 6]
    return hand;
  }, [secondPlayer.currentHp, secondPlayer.character.name]);

  useEffect(() => {
    initializeBoard();
  }, []);
  return (
    <Grid2 container padding={1}>
      <Grid2 size={4} display={"flex"} justifyContent={"space-between"} paddingX={2.5}>
        <img style={{ height: 31 }} src={firstPlayer.character.portrait} alt={firstPlayer.character.portrait} />
        <div style={{ display: "flex", alignItems: "center" }}>{firstPlayer.character.name}</div>
        <div></div>
      </Grid2>

      <Grid2 size={4} paddingBottom={0.5}>
        <ButtonGroup variant={"outlined"} size={"small"}>
          <Button
            onClick={() => {
              if (!hasControl && socketStatus === "CONNECTED") return;
              navigate("/board/characterSelect");
            }}>
            <Person />
          </Button>
          <Button onClick={initializeBoard}>
            <Refresh />
          </Button>
          <Button onClick={handleOpenRemoteDialog} ref={remoteButtonRef}>
            <Cable/>
          </Button>
          <Button onClick={handleOpenSettingsDialog} ref={settingsButtonRef}>
            <Settings />
          </Button>
          <Button onClick={toggleDamageLog(true)}>
            <EditNote />
          </Button>
        </ButtonGroup>
      </Grid2>

      <Grid2 size={4} display={"flex"} justifyContent={"space-between"} paddingX={2.5}>
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
        <GetTimerDisplay />
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
