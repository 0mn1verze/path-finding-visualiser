import {
  getBidirectionalShortestPath,
  getNeighbours,
  nodeID,
} from "../scripts/utilties";

export default function biBFS(board) {
  if (
    !board.startNode ||
    !board.finishNode ||
    board.startNode === board.finishNode
  )
    return [[], []];

  let visited = [];

  let src_queue = [];
  let dest_queue = [];

  let src_parent = {};
  let dest_parent = {};

  src_queue.push(board.startNode);
  dest_queue.push(board.finishNode);

  while (src_queue.length > 0 && dest_queue.length > 0) {
    let current = src_queue.shift();

    if (!current.visited.src) {
      if (current.type === "wall") continue;

      current.visited.src = true;
      visited.push(current);

      if (current.type === "finish") {
        return [
          visited,
          getBidirectionalShortestPath(src_parent, dest_parent, current),
        ];
      }

      getNeighbours(board.grid, current).forEach((neighbour) => {
        if (!neighbour.visited.src) {
          src_parent[nodeID(neighbour)] = current;
          src_queue.push(neighbour);
        }
      });
    }

    if (current.visited.src && current.visited.dest)
      return [
        visited,
        getBidirectionalShortestPath(src_parent, dest_parent, current),
      ];

    current = dest_queue.shift();

    if (!current.visited.dest) {
      if (current.type === "wall") continue;

      current.visited.dest = true;
      visited.push(current);

      if (current.type === "start") {
        return [
          visited,
          getBidirectionalShortestPath(src_parent, dest_parent, current),
        ];
      }

      getNeighbours(board.grid, current).forEach((neighbour) => {
        if (!neighbour.visited.dest) {
          dest_parent[nodeID(neighbour)] = current;
          dest_queue.push(neighbour);
        }
      });
    }

    if (current.visited.src && current.visited.dest)
      return [
        visited,
        getBidirectionalShortestPath(src_parent, dest_parent, current),
      ];
  }

  return [visited, []];
}
