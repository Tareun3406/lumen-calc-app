import { Chip, Grid2, List, ListItemText } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRemote, showNotificationMessage } from "../../features/board/remoteSlice";
import { useCallback, useMemo, useState } from "react";

function RemoteConnected() {
  const {username, playerList, observerList, playerInviteCode, observerInviteCode, hostName} = useAppSelector(selectRemote);
  const dispatch = useAppDispatch();

  const [ viewPlayerCode, setViewPlayerCode ] = useState<boolean>(false);
  const [ viewObserverCode, setViewObserverCode ] = useState<boolean>(false);

  const onClickPlayerCodeChip = useCallback(() => {
    if (!viewPlayerCode) {
      setViewPlayerCode(true);
    }
    navigator.clipboard.writeText(playerInviteCode);
    dispatch(showNotificationMessage({message: "클립보드에 복사 하였습니다.", status: "info"}));
  }, [viewPlayerCode, playerInviteCode, dispatch])

  const onClickObserverCodeChip = useCallback(() => {
    if (!viewObserverCode) {
      setViewObserverCode(true);
    }
    navigator.clipboard.writeText(observerInviteCode);
    dispatch(showNotificationMessage({message: "클립보드에 복사 하였습니다.", status: "info"}));
  }, [viewObserverCode, observerInviteCode, dispatch])


  const renderPlayerInviteCode = useMemo(() => {
    // todo 코드 숨기기
    // todo 리모트 관련 안내 메세지 추가 ex) 연결 해제됨, 연결됨, 에러, 관전자 조작 금지 등
    return playerInviteCode
      ? (
        <Grid2 size={6} marginBottom={1}>
          <div>진행자 초대 코드</div>
          <Chip color={"primary"} label={viewPlayerCode ? playerInviteCode : "초대 코드 확인"}
          onClick={onClickPlayerCodeChip} sx={{minWidth: 98}}/>
        </Grid2>
      )
      : (<Grid2 size={6} marginBottom={1}></Grid2>);
  }, [playerInviteCode, viewPlayerCode, onClickPlayerCodeChip]);

  const renderObserverInviteCode = useMemo(() => {
    return observerInviteCode
      ? (
        <Grid2 size={6} marginBottom={1}>
          <div>관전자 초대 코드</div>
          <Chip color={"primary"} label={ viewObserverCode ? observerInviteCode : "초대 코드 확인"}
          onClick={onClickObserverCodeChip} sx={{minWidth: 98}}/>
        </Grid2>
      )
      : (<Grid2 size={6} marginBottom={1}></Grid2>);
  }, [observerInviteCode, viewObserverCode, onClickObserverCodeChip])

  const getUsernameClass = (targetName: string) => {
    if (targetName === hostName) return "red";
    if (targetName === username) return "blue";
    return "";
  }

  return(
    <Grid2 container maxHeight={"80%"} width={364}>
      {playerInviteCode && (renderPlayerInviteCode)}
      {observerInviteCode && (renderObserverInviteCode)}
      <Grid2
        container
        size={12}
        sx={() => ({
          "--Grid-borderWidth": "1px",
          borderTop: "var(--Grid-borderWidth) solid",
          borderColor: "divider",
          "& > div": {
            borderRight: "var(--Grid-borderWidth) solid",
            borderBottom: "var(--Grid-borderWidth) solid",
            borderColor: "divider"
          }
        })}>
        <Grid2 size={6}>참가자 목록</Grid2>
        <Grid2 size={6}>관전자 목록</Grid2>
        <Grid2 size={6}>
          <List>
            {playerList.map((playerName, index) => (
              <ListItemText key={index} className={getUsernameClass(playerName)}>{playerName}</ListItemText>
            ))}
          </List>
        </Grid2>
        <Grid2 size={6}>
          <List>
            {observerList.map((observerName, index) => (
              <ListItemText key={index} className={getUsernameClass(observerName)}>{observerName}</ListItemText>
            ))}
          </List>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}

export default RemoteConnected;