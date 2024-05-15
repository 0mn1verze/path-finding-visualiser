import { getNeighbours } from "../scripts/utilties";

export default function backTrackMaze(board) {
  let path = [];
  let stack = [];

  board.grid[1][1].visited.src = true;
  let current = board.grid[1][1];

  while (true) {
    current.visited.src = true;
    let neighbours = getNeighbours(board.grid, current, 2).filter(
      (node) => node.type !== "start" && node.type !== "finish"
    );
    if (neighbours.length !== 0) {
      let randomIdx = Math.floor(Math.random() * neighbours.length);
      let randomNeighbour = neighbours[randomIdx];

      stack.push(current);

      let wall =
        board.grid[(current.row + randomNeighbour.row) / 2][
          (current.col + randomNeighbour.col) / 2
        ];

      path.push(current);
      path.push(wall);

      current = randomNeighbour;
    } else if (stack.length > 0) {
      let node = current;
      path.push(current);
      current = stack.pop();
      path.push(
        board.grid[(node.row + current.row) / 2][(node.col + current.col) / 2]
      );
    } else break;
  }

  path.push(board.grid[1][1]);

  return path;
}
