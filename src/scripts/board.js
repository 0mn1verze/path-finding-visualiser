const DEFAULT_START_ROW = 10;
const DEFAULT_START_COL = 4;
const DEFAULT_FINISH_ROW = 10;
const DEFAULT_FINISH_COL = 46;

const ROW = 21;
const COL = 51;

export default class Board {
  constructor(board = null) {
    this.grid = board != null ? board.grid : [];

    this.row = ROW;
    this.col = COL;

    if (this.grid.length === 0) {
      this.start_row = DEFAULT_START_ROW;
      this.start_col = DEFAULT_START_COL;
      this.finish_row = DEFAULT_FINISH_ROW;
      this.finish_col = DEFAULT_FINISH_COL;
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
      distance: Infinity,
      score: Infinity,
      isVisited: false,
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
    node.type = "wall";
  }

  removeWall(row, col) {
    const node = this.grid[row][col];
    if (node.type === "start" || node.type === "finish") return;
    node.type = "empty";
  }

  _resetNode(row, col) {
    const node = this.grid[row][col];
    node.type = "empty";
    node.isVisited = false;
    node.score = Infinity;
    node.distance = Infinity;
    node.previousNode = null;
  }

  moveStart(row, col) {
    if (this.grid[row][col].type === "finish") return;
    this._resetNode(this.start_row, this.start_col);
    this.start_row = row;
    this.start_col = col;
    this.grid[row][col].type = "start";
    this.startNode = this.grid[this.start_row][this.start_col];
  }

  moveFinish(row, col) {
    if (this.grid[row][col].type === "start") return;
    this._resetNode(this.finish_row, this.finish_col);
    this.finish_row = row;
    this.finish_col = col;
    this.grid[row][col].type = "finish";
    this.finishNode = this.grid[this.finish_row][this.finish_col];
  }
}
