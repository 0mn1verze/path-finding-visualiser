import PriorityQueue from "./priorityQueue";
import { getNeighbours, distance } from "./utilities";

export default function astar(board, startNode, finishNode) {
  // Return false if start or finish node is not provided or they are the same
  if (!startNode || !finishNode || startNode === finishNode) return false;

  // Set distance of start node to 0
  board.grid[startNode.row][startNode.col].distance = 0;
  board.grid[startNode.row][startNode.col].score = 0;

  // Comparator function to compare distances of two nodes
  const nodeDistanceComparator = (a, b) => a.score < b.score;

  // List to store visited nodes
  let visited = [];

  // Priority queue to store nodes to visit
  let queue = new PriorityQueue(nodeDistanceComparator);
  queue.push(board.grid[startNode.row][startNode.col]);

  while (queue.size() > 0) {
    // Get a new node from the priority queue to visit
    const current = queue.pop();

    // If the node is visited ignore it (It happens when multiple entries of the same node is added to the priority queue)
    if (current.isVisited) continue;

    // If the node is a wall ignore it
    if (current.type === "wall") continue;

    // Set current node to visited and add it to the visited list
    current.isVisited = true;
    visited.push(current);

    if (current.type === "finish") return [visited, true]; // return visited nodes when finish node is reached

    // Update distances for neighbours
    getNeighbours(board.grid, current).forEach((neighbour) => {
      // Update distances for neighbours
      const g = current.distance + 1;
      // Heuristic for A* algorithm
      const h = distance(neighbour, finishNode);
      // Extra heuristic for A* algorithm
      const f = g + h;
      // Update distance if the new distance is less than the current distance
      if (g < neighbour.distance) {
        neighbour.distance = g;
        neighbour.score = f;
        neighbour.previousNode = current;
        queue.push(neighbour);
      }
    });
  }

  return [visited, false]; // return visited nodes when finish node is not reachable
}
