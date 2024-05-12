export default function recursiveMaze(board) {
  const walls = divide(board, 0, 0, board.row, board.col);
  return walls;
}

function divideHorizontal(width, height) {
  if (width > height) return true;
  else if (height > width) return false;
  else return Math.random() < 0.5 ? true : false;
}

function pickRandom(limit, even) {
  let random = Math.floor((Math.random() * limit) / 2);
  return even ? random * 2 : random * 2 + 1;
}

function divide(board, row, col, height, width) {
  let walls = [];

  if (width < 2 || height < 2) return walls;

  let horizontal = divideHorizontal(width, height);

  let wallRow = row + (horizontal ? 0 : pickRandom(height - 2, false));
  let wallCol = col + (horizontal ? pickRandom(width - 2, false) : 0);

  let passageRow = wallRow + (horizontal ? pickRandom(height, true) : 0);
  let passageCol = wallCol + (horizontal ? 0 : pickRandom(width, true));

  let dR = horizontal ? 1 : 0;
  let dC = horizontal ? 0 : 1;

  for (let i = 0; i < (horizontal ? height : width); i++) {
    let r = wallRow + i * dR;
    let c = wallCol + i * dC;
    if (r !== passageRow || c !== passageCol) walls.push(board.grid[r][c]);
  }

  let newHeight = horizontal ? height : wallRow - row;
  let newWidth = horizontal ? wallCol - col : width;

  walls = walls.concat(divide(board, row, col, newHeight, newWidth));

  let newRow = horizontal ? row : wallRow + 1;
  let newCol = horizontal ? wallCol + 1 : col;

  newHeight = horizontal ? height : row + height - wallRow - 1;
  newWidth = horizontal ? col + width - wallCol - 1 : width;

  walls = walls.concat(divide(board, newRow, newCol, newHeight, newWidth));

  return walls;
}
