export function animate(node, ms) {
  if (node.type === "start" || node.type === "finish") return;
  const ele = document.getElementById(`${node.row}-${node.col}`);
  ele.classList.add("animate");
  setTimeout(() => ele.classList.remove("animate"), ms);
}

export function getNeighbours(grid, node, gap = 1) {
  const neighbours = [];
  const { row, col } = node;
  if (row > gap - 1) neighbours.push(grid[row - gap][col]);
  if (row < grid.length - gap) neighbours.push(grid[row + gap][col]);
  if (col > gap - 1) neighbours.push(grid[row][col - gap]);
  if (col < grid[0].length - gap) neighbours.push(grid[row][col + gap]);
  return neighbours.filter((neighbour) => !neighbour.isVisited);
}

export function distance(node1, node2) {
  // return Math.abs(node1.row - node2.row) + Math.abs(node1.col - node2.col);
  return Math.sqrt(
    Math.pow(node1.row - node2.row, 2) + Math.pow(node1.col - node2.col, 2)
  );
}

export function merge(cell, randomNeighbour, sets) {
  let deleteSet =
    cell.set < randomNeighbour.set ? randomNeighbour.set : cell.set;
  let keepSet = cell.set < randomNeighbour.set ? cell.set : randomNeighbour.set;
  sets[deleteSet].forEach((node) => {
    node.set = keepSet;
  });
  sets[keepSet].push(...sets[deleteSet]);
  delete sets[deleteSet];
}

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
// Fisher Yates Algorithm

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function randomSample(a, n) {
  return shuffle(a).slice(0, n);
}

export function randomOdd(n) {
  return Math.floor((Math.random() * (n - 1)) / 2) * 2 + 1;
}

export function getShortestPath(finishNode) {
  let path = [];
  let current = finishNode;
  if (current.previousNode === null) return;
  while (current.type !== "start" && current.previousNode !== null) {
    current = current.previousNode;
    path.unshift(current);
  }
  path.shift();

  return path;
}

export function nodeID(node) {
  return `${node.row}-${node.col}`;
}

export function getBidirectionalShortestPath(src_parent, dest_parent, current) {
  let path = [current];
  let i = current;
  if (src_parent[nodeID(i)] == null) return path;
  while (i.type !== "start" && src_parent[nodeID(i)] != null) {
    i = src_parent[nodeID(i)];
    path.unshift(i);
  }

  i = current;
  if (dest_parent[nodeID(i)] == null) return path;
  while (i.type !== "finish" && dest_parent[nodeID(i)] != null) {
    i = dest_parent[nodeID(i)];
    path.push(i);
  }

  return path;
}
