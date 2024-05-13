import PathFind from "./pathfind";
import Board from "../../scripts/board";

import { useState } from "react";

import {
  pathFindingAlgorithms,
  mazeGenerationAlgorithms,
} from "../../scripts/algorithms";

import "../style/navbar.css";

import MazeGen from "./mazegen";

export default function Navbar({
  board,
  setBoard,
  visualState,
  setVisualState,
  animation,
  pathFindAlgo,
  setPathFindAlgo,
}) {
  const [mazeGenAlgo, setMazeGenAlgo] = useState(
    mazeGenerationAlgorithms.recursiveMaze
  );

  function clear() {
    setBoard(new Board());
    animation.reset();
    setVisualState({
      generatingMaze: false,
      generatingResult: false,
      mazeGenerated: false,
      solved: false,
    });
  }

  let disable = visualState.generatingResult || visualState.generatingMaze;

  return (
    <nav className="navbar">
      <div className="nav nav-pills container-fluid d-flex justify-content-center align-items-center fs-5">
        <div className="navbar-header mx-auto my-3">
          <a className="navbar-brand fs-1 fw-bolder text-white" href="#">
            Pathfinding Visualiser
          </a>
        </div>
        <button
          className="btn btn-primary menu-btn clear-grid"
          onClick={clear}
          disabled={disable}
        >
          Clear Grid
        </button>
        <PathFind
          board={board}
          setBoard={setBoard}
          visualState={visualState}
          setVisualState={setVisualState}
          animation={animation}
          pathFindAlgo={pathFindAlgo}
          setPathFindAlgo={setPathFindAlgo}
        />
        <MazeGen
          board={board}
          setBoard={setBoard}
          visualState={visualState}
          setVisualState={setVisualState}
          animation={animation}
          mazeGenAlgo={mazeGenAlgo}
          setMazeGenAlgo={setMazeGenAlgo}
        />
      </div>
    </nav>
  );
}
