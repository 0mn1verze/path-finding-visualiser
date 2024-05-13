import PriorityQueue from "../mazeGenAlgorithms/priorityQueue";
import {
  getBidirectionalShortestPath,
  getNeighbours,
  nodeID,
  distance,
} from "../scripts/utilties";

export default function biAStar(board) {
  if (
    !board.startNode ||
    !board.finishNode ||
    board.startNode === board.finishNode
  )
    return [[], []];

  let visited = [];

  board.startNode.distance.src = 0;
  board.startNode.score.src = 0;
  board.finishNode.distance.dest = 0;
  board.finishNode.score.dest = 0;

  // Comparator function to compare distances of two nodes
  const src_comp = (a, b) => a.score.src < b.score.src;
  const dest_comp = (a, b) => a.score.dest < b.score.dest;

  let src_queue = new PriorityQueue(src_comp);
  let dest_queue = new PriorityQueue(dest_comp);

  let src_parent = {};
  let dest_parent = {};

  src_queue.push(board.startNode);
  dest_queue.push(board.finishNode);

  while (src_queue.size() > 0 && dest_queue.size() > 0) {
    let current = src_queue.pop();

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
        // Update distances for neighbours
        const g = current.distance.src + 1;
        // Heuristic for A* algorithm
        const h = distance(neighbour, board.finishNode);
        // Extra heuristic for A* algorithm
        const f = g + h;
        // Update distance if the new distance is less than the current distance
        if (g < neighbour.distance.src) {
          neighbour.distance.src = g;
          neighbour.score.src = f;
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

    current = dest_queue.pop();

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
        // Update distances for neighbours
        const g = current.distance.dest + 1;
        // Heuristic for A* algorithm
        const h = distance(neighbour, board.startNode);
        // Extra heuristic for A* algorithm
        const f = g + h;
        // Update distance if the new distance is less than the current distance
        if (g < neighbour.distance.dest) {
          neighbour.distance.dest = g;
          neighbour.score.dest = f;
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
