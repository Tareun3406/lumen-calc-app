import { Button, Grid2 } from "@mui/material";

export interface RemoteDefaultProps {
  onClickHost: () => void;
  onClickJoin: () => void;
}
function RemoteDefault(props: RemoteDefaultProps) {
  return (
    <Grid2 container spacing={2} margin={2} >
      <Grid2 size={6}>
        <Button size={"large"} variant={"contained"} onClick={props.onClickHost}>
          초대코드 만들기
        </Button>
      </Grid2>
      <Grid2 size={6}>
        <Button size={"large"} variant={"contained"} onClick={props.onClickJoin}>
          초대코드로 연결
        </Button>
      </Grid2>
    </Grid2>
  )
}
export default RemoteDefault
