export function getNeighbours(grid, node) {
  const neighbours = [];
  const { row, col } = node;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter((neighbour) => !neighbour.isVisited);
}

export function distance(node1, node2) {
  // return Math.abs(node1.row - node2.row) + Math.abs(node1.col - node2.col);
  return Math.sqrt(
    Math.pow(node1.row - node2.row, 2) + Math.pow(node1.col - node2.col, 2)
  );
}
