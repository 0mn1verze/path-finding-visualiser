import { getNeighbours, getShortestPath } from "../scripts/utilties";

export default function depthFirstSearch(board) {
  if (
    !board.startNode ||
    !board.finishNode ||
    board.startNode === board.finishNode
  )
    return [[], []];

  let visited = [];
  let queue = [];
  queue.push(board.startNode);

  while (queue.length > 0) {
    const current = queue.pop();

    if (current.visited.src) continue;

    if (current.type === "wall") continue;

    current.visited.src = true;
    visited.push(current);

    if (current.type === "finish")
      return [visited, getShortestPath(board.finishNode)];

    getNeighbours(board.grid, current).forEach((neighbour) => {
      if (!neighbour.visited.src) {
        neighbour.previousNode = current;
        queue.push(neighbour);
      }
    });
  }

  return [visited, []];
}
