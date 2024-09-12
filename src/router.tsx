import { createBrowserRouter } from "react-router-dom";
import Title from "./view/title";
import Board from "./view/Board";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Title />
  },
  {
    path: "/board",
    element: <Board />
  }
]);
