import dijkstra from "../algorithms/dijkstra";
import astar from "../algorithms/astar";

import randomMaze from "../algorithms/randommaze";
import recursiveMaze from "../algorithms/recursiveMaze";

export const pathFindingAlgorithms = {
  dijkstra: { name: "Dijkstra", algorithm: dijkstra },
  astar: { name: "A*", algorithm: astar },
};

export const mazeGenerationAlgorithms = {
  randomMaze: { name: "Random Maze", algorithm: randomMaze },
  recursiveMaze: { name: "Recursive Maze", algorithm: recursiveMaze },
};
