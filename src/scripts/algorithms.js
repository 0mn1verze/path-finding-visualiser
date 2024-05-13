import dijkstra from "../pathFindAlgorithms/dijkstra";
import astar from "../pathFindAlgorithms/AStar";
import breathFirstSearch from "../pathFindAlgorithms/BFS";
import depthFirstSearch from "../pathFindAlgorithms/DFS";
import biBFS from "../pathFindAlgorithms/biBFS";
import biDijkstra from "../pathFindAlgorithms/biDijkstra";

import randomMaze from "../mazeGenAlgorithms/randomMaze";
import recursiveMaze from "../mazeGenAlgorithms/recursiveMaze";
import backTrackMaze from "../mazeGenAlgorithms/backtrackMaze";
import kruskalMaze from "../mazeGenAlgorithms/kruskalMaze";
import ellerMaze from "../mazeGenAlgorithms/ellerMaze";
import primMaze from "../mazeGenAlgorithms/primMaze";
import biAStar from "../pathFindAlgorithms/biAStar";

export const pathFindingAlgorithms = {
  dijkstra: { name: "Dijkstra", algorithm: dijkstra },
  astar: { name: "A*", algorithm: astar },
  breathFirstSearch: {
    name: "Breath First Search",
    algorithm: breathFirstSearch,
  },
  depthFirstSearch: { name: "Depth First Search", algorithm: depthFirstSearch },
  biBFS: { name: "Bidirectional BFS", algorithm: biBFS },
  biDijkstra: { name: "Bidirectional Dijkstra", algorithm: biDijkstra },
  biAStar: { name: "Bidirectional A*", algorithm: biAStar },
};

export const mazeGenerationAlgorithms = {
  randomMaze: { name: "Random Maze", algorithm: randomMaze, wallGen: true },
  recursiveMaze: {
    name: "Recursive Maze",
    algorithm: recursiveMaze,
    wallGen: true,
  },
  backtrackMaze: {
    name: "Backtrack Maze",
    algorithm: backTrackMaze,
    wallGen: false,
  },
  kruskalMaze: {
    name: "Kruskal Maze",
    algorithm: kruskalMaze,
    wallGen: false,
  },
  ellerMaze: {
    name: "Eller Maze",
    algorithm: ellerMaze,
    wallGen: false,
  },
  primMaze: {
    name: "Prim Maze",
    algorithm: primMaze,
    wallGen: false,
  },
};
