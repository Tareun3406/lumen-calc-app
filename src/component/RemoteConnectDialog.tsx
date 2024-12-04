import {
  Button,
  Dialog, DialogActions,
  DialogTitle
} from "@mui/material";
import { useEffect, useState } from "react";
import RemoteConnected from "./remote/RemoteConnected";
import RemoteDefault from "./remote/RemoteDefault";
import RemoteJoin from "./remote/RemoteJoin";
import { useAppSelector } from "../app/hooks/storeHooks";
import { selectRemote } from "../app/slices/remoteSlice";
import RemoteHost from "./remote/RemoteHost";
import { useRemote } from "../app/hooks/remoteHooks";

export interface RemoteConnectDialogProps {
  open: boolean;
  handleClose: () => void;
}

function RemoteConnectDialog(props: RemoteConnectDialogProps) {
  const [selectType, setSelectType] = useState<"NONE" | "HOST" | "JOIN" | "PENDING" | "CONNECTED" | "DISCONNECTED">("NONE");
  const { socketStatus } = useAppSelector(selectRemote);

  const { disconnectRemote, reconnectRemote } = useRemote();
  useEffect(() => {
    if (socketStatus === "CONNECTED") setSelectType("CONNECTED");
    else if (socketStatus === "NONE") setSelectType("NONE");
    else if (socketStatus === "DISCONNECTED") setSelectType("DISCONNECTED");
  }, [socketStatus]);

  const handleCancel = async () => {
    await disconnectRemote();
    setSelectType("NONE");
  }
  const handleReconnect = async () => {
    await reconnectRemote();
  }
  const handleClose = () => {
    if (selectType === "DISCONNECTED") {
      console.log("닫기 캔슬")
      return;
    }
    props.handleClose();
  }


  const reconnectConfirmMessage = (
    <div style={{textAlign:"left", marginLeft: 20, marginRight: 20}}>
      서버와의 연결이 끊어졌습니다. <br/>
      재연결을 시도하시겠습니까?
    </div>
  )
  const reconnectConfirmButton = (
    <DialogActions>
      <Button onClick={handleCancel}>취소</Button>
      <Button onClick={handleReconnect}>재연결</Button>
    </DialogActions>
  )

  return (
    <Dialog open={props.open} onClose={handleClose} disableEnforceFocus>
      <DialogTitle>
        <span>리모트 연결</span> {selectType === "DISCONNECTED" && (<span> 오류</span>)}
        {
          socketStatus === "CONNECTED" &&
          (<Button size={"small"} variant={"outlined"} sx={{position: "absolute", right: 20}} onClick={() => disconnectRemote()}>
            연결 끊기
          </Button>)
        }
      </DialogTitle>
      {selectType === "NONE" && <RemoteDefault onClickHost={() => setSelectType("HOST")}
                                               onClickJoin={() => setSelectType("JOIN")} />}
      {selectType === "HOST" && <RemoteHost onClickBack={() => setSelectType("NONE")} />}
      {selectType === "JOIN" && <RemoteJoin onClickBack={() => setSelectType("NONE")} />}
      {selectType === "CONNECTED" && <RemoteConnected/>}

      {selectType === "DISCONNECTED" && reconnectConfirmMessage}
      {selectType === "DISCONNECTED" && reconnectConfirmButton}
    </Dialog>
  );
}

export default RemoteConnectDialog;