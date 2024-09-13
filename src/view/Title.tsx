import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Title() {
  const navigate = useNavigate();

  return (
    <Box>
      <Button variant="contained" onClick={() => navigate("/board/characterSelect")}>
        시작하기
      </Button>
    </Box>
  );
}

export default Title;
