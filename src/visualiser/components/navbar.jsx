import PathFind from "./pathfind";
import Board from "../../scripts/board";

import { useState } from "react";

import { mazeGenerationAlgorithms } from "../../scripts/algorithms";

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
  const [mazeGenAlgo, setMazeGenAlgo] = useState(mazeGenerationAlgorithms[0]);

  function clear() {
    board.resetGrid();
    setBoard(new Board(board));
    animation.reset();
    setVisualState({
      generatingMaze: false,
      generatingResult: false,
      mazeGenerated: false,
      solved: false,
    });
  }

  function clearPath() {
    animation.reset();
    setVisualState({
      ...visualState,
      generatingResult: false,
      solved: false,
    });
  }

  let disable = visualState.generatingResult || visualState.generatingMaze;

  return (
    <nav id="nav" className="navbar">
      <div className="nav nav-pills d-flex justify-content-center align-items-center container-fluid">
        <div className="navbar-header mx-auto my-3">
          <p id="title" className="navbar-brand fw-bolder text-white">
            Pathfinding Visualiser
          </p>
        </div>
        <button
          id="menu-btn"
          className="btn btn-primary m-2"
          onClick={clear}
          disabled={disable}
        >
          Clear Grid
        </button>
        <button
          id="menu-btn"
          className="btn btn-primary m-2"
          onClick={clearPath}
          disabled={disable}
        >
          Clear Path
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
