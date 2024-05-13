import { animate } from "./utilties";

export default class MazeGenAnimation {
  constructor(board, callback = () => {}) {
    this.board = board;
    this.nodes = board.grid;
    this._callback = callback;
    this.startNode = this.board.startNode;
    this.finishNode = this.board.finishNode;
  }

  _showWall(node) {
    if (node.type === "start" || node.type === "finish") return;
    document.getElementById(`${node.row}-${node.col}`).className = "node wall";
    node.type = "wall";
  }

  _addWall(node) {
    if (node.type === "start" || node.type === "finish") return;
    document.getElementById(`${node.row}-${node.col}`).className = "node wall";
    animate(node, 500);
    node.type = "wall";
  }

  _removeWall(node) {
    if (node.type === "start" || node.type === "finish") return;
    document.getElementById(`${node.row}-${node.col}`).className = "node empty";
    animate(node, 500);
    node.type = "empty";
  }

  _animateWalls() {
    this.walls?.forEach((wall, i) => {
      setTimeout(() => this._addWall(wall), 10 * i);
    });
    setTimeout(this._callback, 10 * this.walls?.length);
  }

  _animatePath() {
    this._setWalls();
    this.path?.forEach((node, i) => {
      setTimeout(() => this._removeWall(node), 10 * (this.board.col + i));
    });
    setTimeout(this._callback, 10 * (this.board.col + this.path?.length));
  }

  visualise(algorithm) {
    if (algorithm === null) return;
    if (algorithm.wallGen) {
      this.walls = algorithm.algorithm(this.board);
      this._animateWalls();
    } else {
      this.path = algorithm.algorithm(this.board);
      this._animatePath();
    }
  }

  _setWalls() {
    for (let i = 0; i < this.board.row; i++) {
      for (let j = 0; j < this.board.col; j++) {
        const node = this.nodes[i][j];
        setTimeout(() => this._showWall(node), 10 * j);
      }
    }
  }

  reset() {
    this.walls = [];
    for (let i = 0; i < this.board.row; i++) {
      for (let j = 0; j < this.board.col; j++) {
        const node = this.nodes[i][j];
        this.board.resetNode(node.row, node.col);
        document.getElementById(`${node.row}-${node.col}`).className =
          "node " + node.type;
      }
    }
  }
}
