import { animate } from "./utilties";

export default class PathFindAnimation {
  constructor(board, callback = () => {}) {
    this.board = board;
    this.nodes = board.grid;
    this._callback = callback;
    this.visited = [];
    this.path = [];
    this.startNode = this.board.startNode;
    this.finishNode = this.board.finishNode;
    this.successful = false;
  }

  update(board) {
    this.board = board;
    this.nodes = board.grid;
    this.visited = [];
    this.path = [];
    this.startNode = this.board.startNode;
    this.finishNode = this.board.finishNode;
    this.successful = false;
  }

  _visitNode(node) {
    if (node.type === "start" || node.type === "finish") return;
    document.getElementById(`${node.row}-${node.col}`).className = "node visit";
    animate(node, 1500);
  }

  _visitPath(node) {
    if (node.type === "start" || node.type === "finish") return;
    document.getElementById(`${node.row}-${node.col}`).className = "node path";
    animate(node, 1500);
  }

  _showNode(node) {
    if (node.type === "start" || node.type === "finish") return;
    document.getElementById(`${node.row}-${node.col}`).className = "node visit";
  }

  _showPath(node) {
    if (node.type === "start" || node.type === "finish") return;
    document.getElementById(`${node.row}-${node.col}`).className = "node path";
  }

  _animatePathFinding() {
    this.visited?.forEach((node, i) => {
      if (i === this.visited.length - 1 && this.path.length !== 0) {
        setTimeout(() => this._animateShortestPath(this.path), 10 * i);
        return;
      }
      setTimeout(() => this._visitNode(node), 10 * i);
    });
  }

  _animateShortestPath() {
    this.path?.forEach((node, i) => {
      setTimeout(() => this._visitPath(node), 50 * i);
    });

    setTimeout(() => this._callback(), 50 * this.path.length);
  }

  _showPathFinding() {
    this.visited?.forEach((node) => {
      this._showNode(node);
    });
    if (this.path.length !== 0) {
      this.path?.forEach((node) => {
        this._showPath(node);
      });
    }
    this._callback();
  }

  show(algorithm) {
    this.reset();
    [this.visited, this.path] = algorithm(this.board);
    this.visited.shift();
    this._showPathFinding();
  }

  visualise(algorithm) {
    this.reset();
    [this.visited, this.path] = algorithm(this.board);
    this.visited.shift();
    this._animatePathFinding();
  }

  reset() {
    this.visited = [];
    this.path = [];
    this.successful = false;
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
