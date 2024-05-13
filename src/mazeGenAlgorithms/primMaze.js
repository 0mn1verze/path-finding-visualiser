import { getNeighbours, randomOdd } from "../scripts/utilties";

export default function primMaze(board) {
  let path = [];

  let frontier = [];

  let start = board.grid[randomOdd(board.row)][randomOdd(board.col)];
  start.set = 1;

  path.push(start);

  frontier = addFrontier(board, start, frontier);

  while (frontier.length > 0) {
    let node = frontier[Math.floor(Math.random() * frontier.length)];

    let neighbours = getNeighbours(board.grid, node, 2).filter(
      (n) => n.set === 1
    );

    let neighbour = neighbours[Math.floor(Math.random() * neighbours.length)];

    let between =
      board.grid[(node.row + neighbour.row) / 2][
        (node.col + neighbour.col) / 2
      ];

    node.set = 1;
    path.push(between);
    path.push(node);

    frontier = addFrontier(board, node, frontier);
  }

  return path;
}

function addFrontier(board, node, frontier) {
  frontier = frontier.filter((n) => n !== node);

  let neighbours = getNeighbours(board.grid, node, 2).filter(
    (n) => n.set === Infinity
  );

  neighbours.forEach((n) => (n.previousNode = node));

  frontier.push(...neighbours);

  return frontier;
}
