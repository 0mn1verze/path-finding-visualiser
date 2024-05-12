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
    document.getElementById(`${node.row}-${node.col}`).className += " visit";
  }

  _visitPath(node) {
    if (node.type === "start" || node.type === "finish") return;
    document.getElementById(`${node.row}-${node.col}`).className += " path";
  }

  _showNode(node) {
    if (node.type === "start" || node.type === "finish") return;
    document.getElementById(`${node.row}-${node.col}`).className += " visited";
  }

  _showPath(node) {
    if (node.type === "start" || node.type === "finish") return;
    document.getElementById(`${node.row}-${node.col}`).className +=
      " pathFinished";
  }

  _animatePathFinding() {
    this.visited?.forEach((node, i) => {
      if (i === this.visited.length - 1 && this.successful) {
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
    this.path?.forEach((node) => {
      this._showPath(node);
    });
    this._callback();
  }

  show(algorithm) {
    this.reset();
    [this.visited, this.successful] = algorithm(
      this.board,
      this.startNode,
      this.finishNode
    );
    this.visited.shift();
    this._getShortestPath(this.startNode, this.finishNode);
    this._showPathFinding();
  }

  visualise(algorithm) {
    this.reset();
    [this.visited, this.successful] = algorithm(
      this.board,
      this.startNode,
      this.finishNode
    );
    this.visited.shift();
    this._getShortestPath(this.startNode, this.finishNode);
    console.log(this.visited, this.path);
    this._animatePathFinding();
  }

  _getShortestPath() {
    this.path = [];
    let current = this.finishNode;
    if (current.previousNode === null) return;
    while (current.type !== "start") {
      current = current.previousNode;
      this.path.unshift(current);
    }
    this.path.shift();
  }

  reset() {
    this.visited = [];
    this.path = [];
    this.successful = false;
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
