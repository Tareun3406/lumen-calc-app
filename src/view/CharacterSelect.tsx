import { useNavigate } from "react-router-dom";
import { Grid2, ImageList, ImageListItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import {
  selectFirstPlayer,
  selectSecondPlayer,
  setCharacterToFirst,
  setCharacterToSecond
} from "../app/slices/boardSlice";
import characters, { Character } from "../app/scripts/Characters";
import { useEffect } from "react";
import { grey } from "@mui/material/colors";

function CharacterSelect() {
  const navigate = useNavigate();
  const firstPlayer = useAppSelector(selectFirstPlayer);
  const secondPlayer = useAppSelector(selectSecondPlayer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (firstPlayer.character.name === "선택없음" || secondPlayer.character.name === "선택없음") return;
    navigate("/board/play");
  }, [firstPlayer.character, secondPlayer.character]);

  const onClickCharacter = (character: Character, player: "first" | "second") => {
    if (player === "first") dispatch(setCharacterToFirst(character));
    else dispatch(setCharacterToSecond(character));
  };

  const characterButton = (character: Character, player: "first" | "second") => {
    const playerCharacter = player === "first" ? firstPlayer.character : secondPlayer.character;
    const isSelected = playerCharacter.name === character.name;
    const sx = {
      backgroundColor: isSelected ? grey[400] : grey[300],
      border: "2px solid " + (isSelected ? "red" : "black")
    };

    return (
      <ImageListItem key={character.name} sx={sx}>
        <img
          src={character.portrait}
          height={128}
          onClick={() => onClickCharacter(character, player)}
          alt={character.portrait}
        />
      </ImageListItem>
    );
  };

  return (
    <Grid2 container spacing={1}>
      <Grid2 size={6}>
        <div>player 1</div>
        <ImageList cols={3} gap={5} sx={{ maxWidth: 330, margin: "auto" }}>
          {characters.map(character => characterButton(character, "first"))}
        </ImageList>
      </Grid2>
      <Grid2 size={6}>
        <div>player 2</div>
        <ImageList cols={3} gap={5} sx={{ maxWidth: 330, margin: "auto" }}>
          {characters.map(character => characterButton(character, "second"))}
        </ImageList>
      </Grid2>
    </Grid2>
  );
}

export default CharacterSelect;
