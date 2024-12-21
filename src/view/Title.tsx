import { Box, Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import { selectDialog, setOpenHelpDialog } from "../app/slices/dialogSlice";
import HelpDialog from "../component/dialog/HelpDialog";
import { useRef } from "react";

function Title() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { helpDialog } = useAppSelector(selectDialog)

  const helpButtonRef = useRef<HTMLButtonElement | null>(null);

  const onClickHelpButton = () => {
    helpButtonRef.current?.blur();
    dispatch(setOpenHelpDialog(true));
  }

  return (
    <Box>
      <div style={{ margin: 10 }}>
        <Button variant="contained" size={"large"} onClick={() => navigate("/board/characterSelect")} sx={{margin: 1}}>
          시작하기
        </Button>
        <Button ref={helpButtonRef} variant="contained" size="large" onClick={onClickHelpButton}  sx={{margin: 1}}>
          도움말
        </Button>
      </div>
      <Card>
        <CardContent>
          루멘콘덴서 서포트 웹 어플리케이션입니다.
        </CardContent>
      </Card>
      <HelpDialog open={helpDialog.open} />
    </Box>
  );
}

export default Title;
