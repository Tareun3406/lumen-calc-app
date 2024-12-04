import { Grid2, List, ListItemText } from "@mui/material";
import { damageLog } from "../app/slices/boardSlice";

export interface damageLogs {
  damageLogs: damageLog[]
}

function damageLogs(props: damageLogs) {
  const damageLogs = props.damageLogs;

  return (
    <List style={{maxHeight: "70vh"}}>
      <Grid2 size={12}>
        데미지 로그
      </Grid2>
      {damageLogs
        .slice()
        .reverse()
        .map((damageLog, index) => (
          <ListItemText key={index}>
            <Grid2 container spacing={5}>
              <Grid2 size={5}>
                {damageLog.isFirstPlayer ? (
                  <div className={"damageLogFirstPlayer " + (damageLog.type === "DAMAGE" ? "red" : "green")}>
                    {damageLog.type === "DAMAGE" ? "-" : "+"}{damageLog.payload} (남은 체력: {damageLog.result})
                  </div>
                ) : (
                  <div></div>
                )}
              </Grid2>
              <Grid2 size={2}>
                {damageLogs.length - index}
              </Grid2>
              <Grid2 size={5}>
                {!damageLog.isFirstPlayer ? (
                  <div className={"damageLogSecondPlayer " + (damageLog.type === "DAMAGE" ? "red" : "green")}>
                    {damageLog.type === "DAMAGE" ? "-" : "+"}{damageLog.payload} (남은 체력: {damageLog.result})
                  </div>
                ) : (
                  <div></div>
                )}
              </Grid2>
            </Grid2>
          </ListItemText>
        ))}
    </List>
  );
}

export default damageLogs;