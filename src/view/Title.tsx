import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Title() {
  const navigate = useNavigate();

  return (
    <Box>
      <div style={{ margin: 10 }}>
        <Button variant="contained" size={"large"} onClick={() => navigate("/board/characterSelect")}>
          시작하기
        </Button>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>앱으로 설치하여 사용하기를 추천합니다.</div>
        <div>
          PC (크롬 기준): 주소창 우측 앱 설치 아이콘
          <img src={"/down.png"} alt={"down.png"} height={25} /> 클릭
        </div>
        <div>
          Android (크롬 기준): 우측 상단 점세개
          <img src={"/android.png"} alt={"android.png"} /> 터치 - 홈 화면에 추가
        </div>
        <div>
          IOS (사파리만 가능): 공유 아이콘 <img src={"/ios.png"} alt={"ios.png"} height={25} /> 터치 - 홈 화면에 추가
        </div>
      </div>
    </Box>
  );
}

export default Title;
