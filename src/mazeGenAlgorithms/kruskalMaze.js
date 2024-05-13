import { getNeighbours, merge } from "../scripts/utilties";

export default function kruskalMaze(board) {
  let path = [];
  let sets = {};

  for (let i = 0; i < board.row; i++) {
    for (let j = 0; j < board.col; j++) {
      if (i % 2 === 1 && j % 2 === 1) {
        let node = board.grid[i][j];
        node.set = i * board.col + j;
        path.push(node);
        sets[node.set] = [node];
      }
    }
  }

  while (Object.keys(sets).length > 1) {
    let randomIdx =
      Object.keys(sets)[Math.floor(Math.random() * Object.keys(sets).length)];
    let cell = sets[randomIdx][0];

    let neighbours = getNeighbours(board.grid, cell, 2).filter(
      (node) => node.set !== cell.set
    );

    if (neighbours.length === 0) continue;

    let randomNeighbour =
      neighbours[Math.floor(Math.random() * neighbours.length)];

    let node =
      board.grid[(cell.row + randomNeighbour.row) / 2][
        (cell.col + randomNeighbour.col) / 2
      ];
    path.push(node);

    merge(cell, randomNeighbour, sets);
  }

  return path;
}
