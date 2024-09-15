import { useEffect, useMemo, useRef } from "react";
import { PlayerState } from "../../features/board/boardSlice";

interface HpBarProps {
  player: PlayerState;
}

function HpBar(props: HpBarProps) {
  const barClass = props.player.isFirst ? "healthBarFirst" : "healthBarSecond";
  const barStyle = {
    thickness: 15,
    verticalLineThickness: 0.1,
    backgroundColor: "darkgray"
  };
  const pauseBarAnimate = useRef<SVGAnimationElement>(null);

  const percentHp = useMemo(() => {
    return {
      current: (props.player.currentHp / 5000) * 100,
      damage: (props.player.damagedHp / 5000) * 100
    };
  }, [props.player.currentHp, props.player.damagedHp]);

  const hpColor = useMemo(() => {
    if (percentHp.current > 80) return "#69f0ae";
    else if (percentHp.current > 60) return "#81d4fa";
    else if (percentHp.current > 40) return "#b39ddb";
    else if (percentHp.current > 20) return "#ab47bc";
    return "#e91e63";
  }, [percentHp.current]);

  const animateElementId = props.player.isFirst ? "pauseBarAnimateFirst" : "pauseBarAnimateSecond";

  useEffect(() => {
    pauseBarAnimate.current?.beginElement();
  }, [props.player.currentHp]);

  return (
    <svg viewBox={`0 0 100 8.2`} className={`${barClass} healthBar`}>
      <line strokeWidth={barStyle.thickness} stroke={barStyle.backgroundColor} x1={0} y1="0" x2={100} y2="0" />
      <line strokeWidth={barStyle.thickness} stroke={hpColor} x1={0} y1={0} x2={percentHp.current} y2={0} />
      <line
        strokeWidth={barStyle.thickness}
        stroke={"#D32F2F"}
        x1={percentHp.current}
        y1={0}
        x2={percentHp.current + percentHp.damage}
        y2={0}>
        <animate
          id={animateElementId}
          ref={pauseBarAnimate}
          attributeName="x2"
          from={percentHp.current + percentHp.damage}
          to={percentHp.current + percentHp.damage}
          dur="0.4s"
          begin="indefinite"
        />
        <animate
          attributeName="x2"
          from={percentHp.current + percentHp.damage}
          to={percentHp.current}
          dur="1s"
          fill="freeze"
          begin={`${animateElementId}.end`}
        />
      </line>
      <line strokeWidth={barStyle.verticalLineThickness} stroke={"black"} x1={80} x2={80} y1={6.5} y2={1} />
      <line strokeWidth={barStyle.verticalLineThickness} stroke={"black"} x1={60} x2={60} y1={6.5} y2={1} />
      <line strokeWidth={barStyle.verticalLineThickness} stroke={"black"} x1={40} x2={40} y1={6.5} y2={1} />
    </svg>
  );
}

export default HpBar;
