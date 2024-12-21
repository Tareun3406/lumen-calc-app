import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { setOpenHelpDialog } from "../../app/slices/dialogSlice";
import { useAppDispatch } from "../../app/hooks/storeHooks";
import { useMemo } from "react";

export interface IHelpDialogProps {
  open: boolean
  // onClose: () => void
}



function HelpDialog(props: IHelpDialogProps) {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    // props.onClose();
    dispatch(setOpenHelpDialog(false))
  }

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
          <br />
          <div>
            큰 화면을 사용하시는 경우 브라우저의 줌 기능을 이용해주세요 <br />
            [Ctr + 휠] or [Ctr + (+/-)]
          </div>
        </div>
      );
    }, [window.navigator.userAgent]);


  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>도움말</DialogTitle>
      <DialogContent>{describeAsPlatform}</DialogContent>
    </Dialog>
  );
}

export default HelpDialog;