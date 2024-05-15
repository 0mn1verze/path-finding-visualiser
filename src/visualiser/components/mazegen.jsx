import Board from "../../scripts/board";

import MazeGenAnimation from "../../scripts/animateMaze";

import "../style/navbar.css";
import { mazeGenerationAlgorithms } from "../../scripts/algorithms";

export default function mazeGen({
  board,
  setBoard,
  visualState,
  setVisualState,
  mazeGenAlgo,
  setMazeGenAlgo,
}) {
  function visualise() {
    board.resetGrid();
    if (visualState.generatingResult) return;
    setVisualState({
      ...visualState,
      generatingMaze: true,
      mazeGenerated: false,
    });
    const animation = new MazeGenAnimation(board, () =>
      setVisualState({
        ...visualState,
        generatingMaze: false,
        mazeGenerated: true,
      })
    );
    animation.visualise(mazeGenAlgo);
    setBoard(new Board(board));
  }

  let disable = visualState.generatingResult || visualState.generatingMaze;

  return (
    <>
      <div className="dropdown m-2">
        <button
          id="menu-btn"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          disabled={disable}
        >
          Maze Generation
        </button>
        <ul className="dropdown-menu">
          {Object.entries(mazeGenerationAlgorithms).map(([key, value]) => (
            <li key={key}>
              <button
                className="dropdown-item"
                onClick={() => setMazeGenAlgo(value)}
              >
                {value.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        id="menu-btn"
        className="btn btn-primary m-2"
        onClick={() => visualise()}
        disabled={disable}
      >
        Visualise {mazeGenAlgo.name}
      </button>
    </>
  );
}
