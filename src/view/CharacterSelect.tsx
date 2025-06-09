import { useNavigate } from "react-router-dom";
import { Button, Grid2, ImageList, ImageListItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import {
  deselectCharacterToFirst, deselectCharacterToSecond,
  selectFirstPlayer,
  selectSecondPlayer,
  setCharacterToFirst,
  setCharacterToSecond
} from "../app/slices/boardSlice";
import characters, { Character } from "../app/scripts/Characters";
import { blue, grey, red } from "@mui/material/colors";
import { useMemo } from "react";

function CharacterSelect() {
  const navigate = useNavigate();
  const firstPlayer = useAppSelector(selectFirstPlayer);
  const secondPlayer = useAppSelector(selectSecondPlayer);
  const dispatch = useAppDispatch();

  const isAllSelected = useMemo(() => {
    return firstPlayer.character.name !== "선택없음" && secondPlayer.character.name !== "선택없음"
  }, [firstPlayer.character, secondPlayer.character])

  const onClickSubmit = () => {
    if (firstPlayer.character.name === "선택없음" || secondPlayer.character.name === "선택없음"){
      return;
    }
    navigate("/board/play");
  }

  const setToNonSelectCharacter = (target: "first" | "second") => {
    if (target === "first") {
      dispatch(deselectCharacterToFirst());
    } else {
      dispatch(deselectCharacterToSecond());
    }
  }

  const onClickCharacter = (character: Character) => {
    if (firstPlayer.character.name === "선택없음") {
      dispatch(setCharacterToFirst(character))
    } else if (secondPlayer.character.name === "선택없음") {
      dispatch(setCharacterToSecond(character));
    }
  };

  const characterButton = (character: Character) => {
    const selectedFirst = firstPlayer.character.name === character.name;
    const selectedSecond = secondPlayer.character.name === character.name;

    const borderColor = () => {
      if (selectedFirst && selectedSecond) {
        return "#dd33fa"
      } else if (selectedFirst) {
        return "red"
      } else if (selectedSecond) {
        return "blue"
      } else return "black"
    }

    const sx = {
      backgroundColor: selectedFirst || selectedSecond ? grey[400] : grey[300],
      border: "2px solid " + borderColor()
    };

    return (
      <ImageListItem key={character.name} sx={sx}>
        <img
          src={character.portrait}
          height={128}
          onClick={() => onClickCharacter(character)}
          alt={character.portrait}
        />
      </ImageListItem>
    );
  };

  const firstPlayerSelectImgStyle = {
    backgroundColor: red[200],
    border: "1px solid black",
  }
  const secondPlayerSelectImgStyle = {
    backgroundColor: blue[200],
    border: "1px solid black",
  }

  return (
    <Grid2 container width={700}>
      <Grid2 size={3.75} height={112}>
        <div>{firstPlayer.character.name}</div>
        <img src={firstPlayer.character.portrait} height={80} alt={firstPlayer.character.portrait} style={firstPlayerSelectImgStyle}/>
      </Grid2>
      <Grid2 size={4.5}>
        <div>
          <div>
            <Button size="large" variant="outlined" sx={{margin: 0.5}} onClick={() => setToNonSelectCharacter("first")}>1P 초기화</Button>
            <Button size="large" variant="outlined" sx={{margin: 0.5}} onClick={() => setToNonSelectCharacter("second")}>2P 초기화</Button>
          </div>
          <div>
            <Button size="large" variant="contained" sx={{margin: 0.5}} onClick={onClickSubmit} disabled={!isAllSelected}>선택 완료</Button>
          </div>
        </div>
      </Grid2>
      <Grid2 size={3.75}>
        <div>{secondPlayer.character.name}</div>
        <img src={secondPlayer.character.portrait} height={80} alt={secondPlayer.character.portrait} style={secondPlayerSelectImgStyle}/>
      </Grid2>
      <Grid2 size={12}>
        <ImageList cols={7} gap={5} sx={{ maxWidth: 660, margin: "auto"}}>
          {characters.filter(character => character.name !== "선택없음").map(character => characterButton(character))}
        </ImageList>
      </Grid2>
    </Grid2>
  );
}

export default CharacterSelect;
