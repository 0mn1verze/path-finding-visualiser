import { merge, randomSample } from "../scripts/utilties";

export default function ellerMaze(board) {
  let path = [];

  let counter = 0;

  for (let i = 1; i < board.row; i += 2) {
    let sets = {};
    // Create a new set for each cell in the row that doesn't belong to a set
    for (let j = 1; j < board.col; j += 2) {
      let node = board.grid[i][j];
      if (node.set in sets) {
        sets[node.set].push(node);
      } else {
        if (node.set === Infinity) node.set = counter++;
        sets[node.set] = [node];
      }

      path.push(node);
    }

    // Connect adjacent cells randomly
    for (let j = 1; j < board.col - 2; j += 2) {
      let node = board.grid[i][j];
      let neighbour = board.grid[i][j + 2];

      if (node.set !== neighbour.set && Math.random() > 0.5) {
        merge(node, neighbour, sets);

        let between = board.grid[i][j + 1];
        path.push(between);
      }
    }

    if (i < board.row - 2) {
      // For each set, connect vertically at least once
      Object.entries(sets).forEach(([key, set]) => {
        let connections = randomSample(
          set,
          Math.floor(Math.random() * (set.length - 1)) + 1
        );

        connections.forEach((node) => {
          let down = board.grid[i + 2][node.col];

          down.set = node.set;

          path.push(board.grid[i + 1][node.col]);
        });
      });
    } else {
      // Connect adjacent cells randomly
      for (let j = 1; j < board.col - 2; j += 2) {
        let node = board.grid[i][j];
        let neighbour = board.grid[i][j + 2];

        if (node.set !== neighbour.set) {
          merge(node, neighbour, sets);

          let between = board.grid[i][j + 1];
          path.push(between);
        }
      }
    }
  }

  return path;
}
