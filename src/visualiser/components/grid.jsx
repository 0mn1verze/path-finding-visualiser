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

  function handlePointerDown(e, row, col) {
    e.preventDefault();
    e.target.releasePointerCapture(e.pointerId);
    if (visualState.generatingResult) return;
    if (!e.isPrimary) return;
    if (!e.pressure) return;
    if (board.grid[row][col].type === "empty") board.addWall(row, col);
    else if (board.grid[row][col].type === "wall") board.removeWall(row, col);

    setBoard(new Board(board));

    setNodeType(board.grid[row][col].type);
  }

  function handlePointerEnter(e, row, col) {
    e.preventDefault();
    if (visualState.generatingResult) return;
    if (!e.isPrimary) return;
    if (!e.pressure) return;
    switch (nodetype) {
      case "start":
        board.moveStart(row, col);
        break;
      case "finish":
        board.moveFinish(row, col);
        break;
      case "wall":
        board.addWall(row, col);
        break;
      case "empty":
        board.removeWall(row, col);
        break;
    }

    setBoard(new Board(board));
  }

  function handlePointerUp(e) {
    e.preventDefault();
    setNodeType("empty");
  }

  useEffect(() => {
    showResult();
  }, [board]);

  return (
    <div
      id="grid"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {board.grid.map((row, i) => (
        <div key={i} id="grid-column">
          {row.map((node, j) => {
            const { row, col, _, type } = node;
            return (
              <Node
                key={j}
                row={row}
                col={col}
                type={type}
                onPointerDown={handlePointerDown}
                onPointerEnter={handlePointerEnter}
                onPointerUp={handlePointerUp}
              ></Node>
            );
          })}
        </div>
      ))}
    </div>
  );
}
