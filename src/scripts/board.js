import { animate } from "./utilties";

import $ from "jquery";

const ROW = Math.floor($(document).height() / 80) * 2 + 1;
const COL = Math.floor($(document).width() / 60) * 2 + 1;

const root = document.querySelector(":root");

const nodeDim = `${Math.floor(($(document).width() * 0.75) / COL)}px`;

root.style.setProperty("--row", ROW);
root.style.setProperty("--col", COL);
root.style.setProperty("--node-width", nodeDim);
root.style.setProperty("--node-height", nodeDim);

export default class Board {
  constructor(board = null) {
    this.grid = board != null ? board.grid : [];

    this.row = ROW;
    this.col = COL;

    if (this.grid.length === 0) {
      this.start_row = Math.floor(this.row / 2);
      this.start_col = 2;
      this.finish_row = Math.floor(this.row / 2);
      this.finish_col = this.col - 3;
      this.resetGrid();
    } else {
      this.start_row = board.start_row;
      this.start_col = board.start_col;
      this.finish_row = board.finish_row;
      this.finish_col = board.finish_col;
    }

    this.startNode = this.grid[this.start_row][this.start_col];
    this.finishNode = this.grid[this.finish_row][this.finish_col];
  }

  resetGrid() {
    this.grid = [];
    for (let i = 0; i < this.row; i++) {
      const currentRow = [];
      for (let j = 0; j < this.col; j++) {
        currentRow.push(this._createNode(i, j));
      }
      this.grid.push(currentRow);
    }
  }

  _createNode(row, col) {
    const nodeType = this.getNodeType(row, col);
    return {
      row,
      col,
      distance: { src: Infinity, dest: Infinity },
      score: { src: Infinity, dest: Infinity },
      set: Infinity,
      visited: { src: false, dest: false },
      path: false,
      previousNode: null,
      type: nodeType,
    };
  }

  getNodeType(row, col) {
    if (row === this.start_row && col === this.start_col) return "start";
    else if (row === this.finish_row && col === this.finish_col)
      return "finish";
    else return "empty";
  }

  addWall(row, col) {
    const node = this.grid[row][col];
    if (node.type === "start" || node.type === "finish") return;
    document.getElementById(`${row}-${col}`).className = "node wall";
    animate(node, 300);
    node.type = "wall";
  }

  removeWall(row, col) {
    const node = this.grid[row][col];
    if (node.type === "start" || node.type === "finish") return;
    document.getElementById(`${row}-${col}`).className = "node empty";
    node.type = "empty";
  }

  resetNode(row, col) {
    const node = this.grid[row][col];

    node.set = Infinity;
    node.score = { src: Infinity, dest: Infinity };
    node.distance = { src: Infinity, dest: Infinity };
    node.visited = { src: false, dest: false };
    node.path = false;
    node.previousNode = null;
  }

  moveStart(row, col) {
    if (this.grid[row][col].type === "finish") return;
    this.resetNode(this.start_row, this.start_col);
    this.startNode.type = "empty";
    this.start_row = row;
    this.start_col = col;
    this.grid[row][col].type = "start";
    this.startNode = this.grid[this.start_row][this.start_col];
  }

  moveFinish(row, col) {
    if (this.grid[row][col].type === "start") return;
    this.resetNode(this.finish_row, this.finish_col);
    this.finishNode.type = "empty";
    this.finish_row = row;
    this.finish_col = col;
    this.grid[row][col].type = "finish";
    this.finishNode = this.grid[this.finish_row][this.finish_col];
  }
}
