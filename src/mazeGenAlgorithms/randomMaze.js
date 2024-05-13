export default function randomMaze(board) {
  let walls = [];
  for (let i = 0; i < board.row; i++) {
    for (let j = 0; j < board.col; j++) {
      const node = board.grid[i][j];
      if (node.type === "start" || node.type === "finish") continue;
      if (Math.random() < 0.3) {
        walls.push(node);
      }
    }
  }

  return walls;
}
