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

class PathFindAlgo {
  constructor(algorithm, name) {
    this.name = name;
    this.algorithm = algorithm;
  }
}

class MazeGenAlgo {
  constructor(algorithm, name, wallGen) {
    this.name = name;
    this.algorithm = algorithm;
    this.wallGen = wallGen;
  }
}

export const pathFindingAlgorithms = [
  new PathFindAlgo(dijkstra, "Dijkstra"),
  new PathFindAlgo(astar, "A*"),
  new PathFindAlgo(breathFirstSearch, "Breath First Search"),
  new PathFindAlgo(depthFirstSearch, "Depth First Search"),
  new PathFindAlgo(biBFS, "Bidirectional BFS"),
  new PathFindAlgo(biDijkstra, "Bidirectional Dijkstra"),
  new PathFindAlgo(biAStar, "Bidirectional A*"),
];

export const mazeGenerationAlgorithms = [
  new MazeGenAlgo(randomMaze, "Random Maze", true),
  new MazeGenAlgo(recursiveMaze, "Recursive Maze", true),
  new MazeGenAlgo(backTrackMaze, "Backtrack Maze", false),
  new MazeGenAlgo(kruskalMaze, "Kruskal Maze", false),
  new MazeGenAlgo(ellerMaze, "Eller Maze", false),
  new MazeGenAlgo(primMaze, "Prim Maze", false),
];
