import { Button, CircularProgress, Grid2, TextField } from "@mui/material";
import { selectRemote, setName } from "../../features/board/remoteSlice";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useRemote } from "./Remote";
import { green } from "@mui/material/colors";

export interface RemoteHostProps {
  onClickBack: () => void;
}

function RemoteHost(props: RemoteHostProps) {
  const dispatch = useAppDispatch();
  const { username, socketStatus } = useAppSelector(selectRemote);
  const { connectRemote, hostRemote } = useRemote();

  const handleCreate = async () => {
    if (socketStatus === "PENDING" || socketStatus === "IDLE") return;

    await connectRemote();
    hostRemote();
    return;
  }
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  }

  return (
    <Grid2 container spacing={1} marginBottom={2} width={300}>
      <Grid2 size={12}>
        <TextField value={username} label="사용할 닉네임" variant="outlined" onChange={handleChangeName}/>
      </Grid2>
      <Grid2 size={6}>
        <Button variant={"outlined"} size={"large"} onClick={props.onClickBack}>뒤로</Button>
      </Grid2>
      <Grid2 size={6} position={'relative'}>
        <Button variant={"contained"} size={"large"} onClick={handleCreate}
                disabled={socketStatus === "PENDING" || socketStatus === "IDLE"}>코드 생성
        </Button>
        {(socketStatus === "PENDING" || socketStatus) === "IDLE" && (
          <CircularProgress size={24} sx={{color: green[500], position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px'}}/>
        )}
      </Grid2>
    </Grid2>
  )
}

export default RemoteHost;