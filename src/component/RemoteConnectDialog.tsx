import {
  Button,
  Dialog,
  DialogTitle
} from "@mui/material";
import { useEffect, useState } from "react";
import RemoteConnected from "./remote/RemoteConnected";
import RemoteDefault from "./remote/RemoteDefault";
import RemoteJoin from "./remote/RemoteJoin";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectRemote } from "../features/board/remoteSlice";
import RemoteHost from "./remote/RemoteHost";
import { useRemote } from "./remote/Remote";

export interface RemoteConnectDialogProps {
  open: boolean;
  handleClose: () => void;
}

function RemoteConnectDialog(props: RemoteConnectDialogProps) {
  const [selectType, setSelectType] = useState<"NONE" | "HOST" | "JOIN" | "PENDING" | "CONNECTED">("NONE");
  const { socketStatus } = useAppSelector(selectRemote);
  const dispatch = useAppDispatch();
  const { disconnectRemote } = useRemote();
  useEffect(() => {
    if (socketStatus === "CONNECTED") setSelectType("CONNECTED");
    else if (socketStatus === "DISCONNECTED") setSelectType("NONE");
  }, [socketStatus]);

  return (
    <Dialog open={props.open} onClose={props.handleClose} disableEnforceFocus>
      <DialogTitle>
        <span>리모트 연결</span>
        <Button size={"small"} variant={"outlined"} sx={{position: "absolute", right: 20}} onClick={() => dispatch(disconnectRemote)}>
          연결 중단
        </Button>
      </DialogTitle>
      {selectType === "NONE" && <RemoteDefault onClickHost={() => setSelectType("HOST")}
                                               onClickJoin={() => setSelectType("JOIN")} />}
      {selectType === "HOST" && <RemoteHost onClickBack={() => setSelectType("NONE")} />}
      {selectType === "JOIN" && <RemoteJoin onClickBack={() => setSelectType("NONE")} />}
      {selectType === "CONNECTED" && <RemoteConnected></RemoteConnected>}
    </Dialog>
  );
}

export default RemoteConnectDialog;