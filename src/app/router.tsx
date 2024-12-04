import { createMemoryRouter } from "react-router-dom";
import Title from "../view/Title";
import Board from "../view/Board";
import CharacterSelect from "../view/CharacterSelect";
import Play from "../view/Play";

const routes = [
  {
    path: "/",
    element: <Title />
  },
  {
    path: "/board",
    element: <Board />,
    children: [
      {
        path: "characterSelect",
        element: <CharacterSelect />
      },
      {
        path: "play",
        element: <Play />
      }
    ]
  }
];

export const mainRouter = createMemoryRouter(routes, {
  initialEntries: ["/", "/board/characterSelect", "/board/play"],
  initialIndex: 0
});
