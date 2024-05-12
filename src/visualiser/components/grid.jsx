import { useEffect, useState } from "react";

import Node from "./node";
import Board from "../../scripts/board";

import "../style/grid.css";

export default function Grid({
  board,
  setBoard,
  visualState,
  setVisualState,
  animation,
  pathFindAlgo,
}) {
  const [nodetype, setNodeType] = useState("empty");

  function showResult() {
    if (visualState.solved && (nodetype === "start" || nodetype === "finish")) {
      setVisualState({
        ...visualState,
        generatingResult: true,
        solved: false,
      });
      animation.update(board);
      animation.show(pathFindAlgo.algorithm);
    }
  }

  function handleMouseDown(e, row, col) {
    e.preventDefault();
    if (visualState.generatingResult) return;
    if (e.buttons === 1) board.addWall(row, col);
    else if (e.buttons === 2) board.removeWall(row, col);
    else return;

    setBoard(new Board(board));

    setNodeType(board.grid[row][col].type);
  }

  function handleMouseEnter(e, row, col) {
    e.preventDefault();
    if (visualState.generatingResult) return;
    if (e.buttons === 1) {
      switch (nodetype) {
        case "start":
          board.moveStart(row, col);
          break;
        case "finish":
          board.moveFinish(row, col);
          break;
        default:
          board.addWall(row, col);
          break;
      }
    } else if (e.buttons === 2) board.removeWall(row, col);
    else return;

    setBoard(new Board(board));
  }

  useEffect(() => {
    showResult();
  }, [board]);

  return (
    <div
      className="grid"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {board.grid.map((row, i) => (
        <div key={i} className="grid-column">
          {row.map((node, j) => {
            const { row, col, _, type } = node;
            return (
              <Node
                key={j}
                row={row}
                col={col}
                type={type}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
              ></Node>
            );
          })}
        </div>
      ))}
    </div>
  );
}
