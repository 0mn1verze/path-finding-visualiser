export default class MazeGenAnimation {
  constructor(board, callback = () => {}) {
    this.board = board;
    this.nodes = board.grid;
    this._callback = callback;
    this.startNode = this.board.startNode;
    this.finishNode = this.board.finishNode;
  }

  _addWall(node) {
    if (node.type === "start" || node.type === "finish") return;
    document.getElementById(`${node.row}-${node.col}`).className = "node wall";
    node.type = "wall";
  }

  _animateWalls() {
    this.walls?.forEach((wall, i) => {
      setTimeout(() => this._addWall(wall), 5 * i);
    });
    setTimeout(this._callback, 5 * this.walls?.length);
  }

  visualise(algorithm) {
    this.walls = algorithm(this.board);
    this._animateWalls();
  }

  reset() {
    this.walls = [];
    for (let i = 0; i < this.board.row; i++) {
      for (let j = 0; j < this.board.col; j++) {
        const node = this.nodes[i][j];
        document.getElementById(`${node.row}-${node.col}`).className =
          "node " + node.type;
        node.isVisited = false;
        node.score = Infinity;
        node.distance = Infinity;
        node.previousNode = null;
      }
    }
  }
}
