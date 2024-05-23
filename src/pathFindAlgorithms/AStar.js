import PriorityQueue from "../mazeGenAlgorithms/priorityQueue";
import { getNeighbours, distance, getShortestPath } from "../scripts/utilties";

export default function astar(board) {
  // Return false if start or finish node is not provided or they are the same
  if (
    !board.startNode ||
    !board.finishNode ||
    board.startNode === board.finishNode
  )
    return [[], []];

  // Set distance of start node to 0
  board.grid[board.startNode.row][board.startNode.col].distance.src = 0;
  board.grid[board.startNode.row][board.startNode.col].score.src = 0;

  // Comparator function to compare distances of two nodes
  const nodeDistanceComparator = (a, b) => a.score.src < b.score.src;

  // List to store visited nodes
  let visited = [];

  // Priority queue to store nodes to visit
  let queue = new PriorityQueue(nodeDistanceComparator);
  queue.push(board.grid[board.startNode.row][board.startNode.col]);

  while (queue.size() > 0) {
    // Get a new node from the priority queue to visit
    const current = queue.pop();

    // If the node is visited ignore it (It happens when multiple entries of the same node is added to the priority queue)
    if (current.visited.src) continue;

    // If the node is a wall ignore it
    if (current.type === "wall") continue;

    // Set current node to visited and add it to the visited list
    current.visited.src = true;
    visited.push(current);

    if (current.type === "finish")
      return [visited, getShortestPath(board.finishNode)]; // return visited nodes when finish node is reached

    // Update distances for neighbours
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
        neighbour.previousNode = current;
        queue.push(neighbour);
      }
    });
  }

  return [visited, []]; // return visited nodes when finish node is not reachable
}

