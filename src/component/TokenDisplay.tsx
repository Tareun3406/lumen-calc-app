import { PlayerState } from "../features/board/boardSlice";

import React from "react";
import TaoTokens from "./tokens/TaoTokens";
import OneToggleToken from "./tokens/OneToggleToken";
import LevTokens from "./tokens/LevTokens";
import LitaTokens from "./tokens/LitaTokens";
import OneCounterToken from "./tokens/OneCounterToken";

interface TokenDisplayProps {
  player: PlayerState;
}
function TokenDisplay(props: TokenDisplayProps) {
  const { player } = props;
  const { character } = player;

  const renderToken = () => {
    switch (character.name) {
      // 토글형 한개
      case "루트":
      case "니아":
      case "델피":
      case "키스":
        return <OneToggleToken player={player} />

      // 토글형 다수
      case "리타":
        return <LitaTokens player={player} />

      // 카운터 형 한가지
      case "울프":
      case "비올라":
        return <OneCounterToken player={player} />;

      case "타오":
        return <TaoTokens player={player} />
      case "레브" :
        return <LevTokens player={player} />
      default:
        return (<div></div>)
    }
  }

  return (renderToken());
}

export default TokenDisplay;