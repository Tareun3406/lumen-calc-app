import { useEffect, useMemo, useRef } from "react";
import { PlayerState } from "../../features/board/boardSlice";

interface HpBarProps {
  targetPlayer: "first" | "second";
  player: PlayerState;
}

function HpBar(props: HpBarProps) {
  const barClass = props.targetPlayer === "first" ? "healthBarFirst" : "healthBarSecond";
  const barStyle = {
    thickness: 15,
    backgroundColor: "darkgray"
  };
  const healthBar = useRef<SVGAnimationElement>(null);
  const pauseBarAnimate = useRef<SVGAnimationElement>(null);

  const percentHp = useMemo(() => {
    return {
      current: (props.player.currentHp / 5000) * 100,
      damage: (props.player.damagedHp / 5000) * 100
    };
  }, [props.player.currentHp, props.player.damagedHp]);

  useEffect(() => {
    pauseBarAnimate.current?.beginElement();
  }, [props.player.currentHp, props.player.damagedHp]);

  return (
    <svg viewBox="0 0 100 10" className={`${barClass}`}>
      <line strokeWidth={barStyle.thickness} stroke={barStyle.backgroundColor} x1="0" y1="0" x2="100" y2="0" />
      <line strokeWidth={barStyle.thickness} stroke={"lightgreen"} x1={0} y1={0} x2={percentHp.current} y2={0} />
      <line
        strokeWidth={barStyle.thickness}
        stroke={"red"}
        x1={percentHp.current}
        y1={0}
        x2={percentHp.current + percentHp.damage}
        y2={0}>
        <animate
          id="pauseBarAnimate"
          ref={pauseBarAnimate}
          attributeName="x2"
          from={percentHp.current + percentHp.damage}
          to={percentHp.current + percentHp.damage}
          dur="0.4s"
          begin="indefinite"
        />
        <animate
          ref={healthBar}
          attributeName="x2"
          from={percentHp.current + percentHp.damage}
          to={percentHp.current}
          dur="1s"
          fill="freeze"
          begin="pauseBarAnimate.end"
        />
      </line>
    </svg>
  );
}

export default HpBar;
