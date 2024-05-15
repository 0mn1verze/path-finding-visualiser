import { useState } from "react";

import Board from "../scripts/board";
import Grid from "./components/grid";

import PathFindAnimation from "../scripts/animatePath";
import { pathFindingAlgorithms } from "../scripts/algorithms";

import "./style/main.css";
import "./style/node.css";

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

  function showResult() {
    if (visualState.solved) {
      animation.update(board);
      animation.show(pathFindAlgo.algorithm);
    }
  }

  const animation = new PathFindAnimation(board, () => {
    setVisualState({
      ...visualState,
      generatingResult: false,
      solved: true,
    });
  });

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
        showResult={showResult}
      />
      <div id="desc" className="description">
        <ul>
          <li>
            <div className="display node start" />
            Start Node
          </li>
          <li>
            <div className="display node finish" />
            Finish Node
          </li>
          <li>
            <div className="display node wall" />
            Wall Node
          </li>
          <li>
            <div className="display node empty" />
            Unvisited Node
          </li>
          <li>
            <div className="display node visit" />
            Visited Node
          </li>
          <li>
            <div className="display node path" />
            Path Node
          </li>
        </ul>
      </div>
      <Grid
        board={board}
        setBoard={setBoard}
        visualState={visualState}
        showResult={showResult}
      />
    </>
  );
}
