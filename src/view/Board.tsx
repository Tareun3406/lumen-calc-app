import { useAppDispatch, useAppSelector } from "../app/hooks";
import { initialize, selectBoard } from "../features/board/boardSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { closeNotification, selectRemote, showNotificationMessage } from "../features/board/remoteSlice";
import { useRemote } from "../component/remote/Remote";
import { Alert, Snackbar } from "@mui/material";
import { SnackbarCloseReason } from "@mui/material/Snackbar/useSnackbar.types";

function Board() {
  const dispatch = useAppDispatch();
  const boardState = useAppSelector(selectBoard);
  const { isPlayer, socketStatus, notification, playerList, hostName } = useAppSelector(selectRemote);
  const { disconnectRemote, publishUpdate } = useRemote();

  const handleCloseSnackBar = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    dispatch(closeNotification());
  }

  useEffect(() => {
    if ((socketStatus === "CONNECTED" || socketStatus === "DISCONNECTED") && !playerList.includes(hostName)) {
      dispatch(showNotificationMessage({message: "호스트의 연결이 끊어졌습니다. 방은 임시로 유지됩니다.", status: "warning"}))
    }
  }, [playerList]);

  useEffect(() => {
    if (!isPlayer && socketStatus === "CONNECTED") return;
    dispatch(initialize());
    return () => {
      if (socketStatus === "CONNECTED") {
        disconnectRemote().then();
      }
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isPlayer && !boardState.preventTrigger) {
      publishUpdate();
    }
    //eslint-disable-next-line
  }, [boardState.triggerPublish, boardState.preventTrigger])
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Outlet />
      <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
        open={notification.show}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        onClick={() => dispatch(closeNotification())}
      >
        <Alert severity={notification.status} variant={"standard"}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Board;
