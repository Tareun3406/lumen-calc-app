import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Play() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Button onClick={() => navigate("/")}>타이틀로 이동</Button>
        <Button onClick={() => navigate("/board/characterSelect")}>캐릭터 선택으로 이동</Button>
      </div>
    </div>
  );
}

export default Play;
