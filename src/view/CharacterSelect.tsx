import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function CharacterSelect() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Button onClick={() => navigate("/")}>타이틀로 이동</Button>
        <Button onClick={() => navigate("/board/play")}>게임판으로 이동</Button>
      </div>
    </div>
  );
}

export default CharacterSelect;
