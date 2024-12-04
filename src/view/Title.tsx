import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

function Title() {
  const navigate = useNavigate();

  const windowElement = (
    <div>
      크롬 기준: 주소창 우측 앱 설치 아이콘
      <img src={"/down.png"} alt={"down.png"} height={25} /> 클릭
    </div>
  );
  const androidElement = (
    <div>
      Android (크롬 기준): 우측 상단 점세개
      <img src={"/android.png"} alt={"android.png"} /> 터치 - 홈 화면에 추가
    </div>
  );

  const iosPcElement = (
    <div>
      사파리 브라우저: 우측 상단 공유 아이콘 <img src={"/ios.png"} alt={"ios.png"} height={25} /> 클릭 - 홈 화면에 추가
    </div>
  );
  const iosMobileElement = (
    <div>
      사파리 브라우저: 공유 아이콘 <img src={"/ios.png"} alt={"ios.png"} height={25} /> 터치 - 홈 화면에 추가
    </div>
  );

  const describeAsPlatform = useMemo(() => {
    const userAgent = window.navigator.userAgent;
    console.log(userAgent);
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>앱으로 설치하여 사용하기를 추천합니다.</div>
        {/windows/i.test(userAgent) && windowElement}
        {/android/i.test(userAgent) && androidElement}
        {/iphone|ipad|ipod/i.test(userAgent) && iosMobileElement}
        {/macintosh|mac os x/i.test(userAgent) && windowElement}
        {/macintosh|mac os x/i.test(userAgent) && iosPcElement}
      </div>
    );
  }, [window.navigator.userAgent]);

  return (
    <Box>
      <div style={{ margin: 10 }}>
        <Button variant="contained" size={"large"} onClick={() => navigate("/board/characterSelect")}>
          시작하기
        </Button>
        {describeAsPlatform}
      </div>
    </Box>
  );
}

export default Title;
