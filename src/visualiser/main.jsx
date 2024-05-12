import { useState } from "react";

import Board from "../scripts/board";
import Grid from "./components/grid";

import PathFindAnimation from "../scripts/animatePath";
import { pathFindingAlgorithms } from "../scripts/algorithms";

import "./style/main.css";

import Navbar from "./components/navbar";

export default function Main() {
  const [board, setBoard] = useState(new Board());
  const [visualState, setVisualState] = useState({
    generatingMaze: false,
    generatingResult: false,
    mazeGenerated: false,
    solved: false,
  });

  const [pathFindAlgo, setPathFindAlgo] = useState(
    pathFindingAlgorithms.dijkstra
  );

  const animation = new PathFindAnimation(board, () =>
    setVisualState({
      ...visualState,
      generatingResult: false,
      solved: true,
    })
  );

  return (
    <>
      <Navbar
        board={board}
        setBoard={setBoard}
        visualState={visualState}
        setVisualState={setVisualState}
        animation={animation}
        pathFindAlgo={pathFindAlgo}
        setPathFindAlgo={setPathFindAlgo}
      />
      <Grid
        board={board}
        setBoard={setBoard}
        visualState={visualState}
        setVisualState={setVisualState}
        animation={animation}
        pathFindAlgo={pathFindAlgo}
      />
    </>
  );
}
