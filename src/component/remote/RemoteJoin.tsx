import { Button, Grid2, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectRemote,
  setName,
} from "../../features/board/remoteSlice";
import { ChangeEvent, useState } from "react";
import { useRemote } from "./Remote";

export interface RemoteJoinProps {
  onClickBack: () => void;
}

function RemoteJoin(props: RemoteJoinProps) {
  const {username, socketStatus} = useAppSelector(selectRemote);
  const dispatch = useAppDispatch();
  const {connectRemote, joinRemote} = useRemote();

  const [inviteCode, setInviteCode] = useState<string>("");

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  }

  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    setInviteCode(e.target.value);
  }

  const handleJoin = async () => {
    if (!inviteCode || !username) return
    await connectRemote();
    joinRemote(inviteCode);
  }
  return (
    <Grid2 container spacing={1} marginBottom={2} width={300}>
      <Grid2 size={12}>
        <TextField label="사용할 닉네임" variant="outlined" value={username} onChange={handleChangeName}/>
      </Grid2>
      <Grid2 size={12}>
        <TextField label="초대코드" variant="outlined" value={inviteCode} onChange={handleChangeCode} />
      </Grid2>
      <Grid2 size={6}>
        <Button variant={"outlined"} size={"large"} onClick={props.onClickBack}>뒤로</Button>
      </Grid2>
      <Grid2 size={6}>
        <Button variant={"contained"} size={"large"} onClick={handleJoin}
                disabled={socketStatus === "PENDING" || socketStatus === "IDLE"}>가입</Button>
      </Grid2>
    </Grid2>
  )
}

export default RemoteJoin