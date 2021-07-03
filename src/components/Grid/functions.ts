export type Coordinates = {
  y: number,
  x: number,
};

export const indexToCoordinates = (index: number): Coordinates => {
  return {
    y: Math.floor(index / 8),
    x: index % 8,
  }
};

const distance = (start: Coordinates, end: Coordinates): number[] => {
  const diffX = Math.abs(end.x - start.x) + 1,
        diffY = Math.abs(end.y - start.y) + 1;

  return [diffX, diffY];
}

const getStraightLine = (start: Coordinates, coord: Coordinates, direction: 'x' | 'y'): Coordinates[] => {
  const isReverse = start[direction] > coord[direction];

  return [...Array(Math.abs(start[direction] - coord[direction]) + 1)].map((_, index) => {
    const p: Coordinates = { x: start.x, y: start.y };
    p[direction] = start[direction] + (index * (isReverse ? -1 : 1));

    return p;
  })
}

const getDiagonal = (start: Coordinates, coord: Coordinates, total: number): Coordinates[] => {
  const diffX = coord.x - start.x,
        diffY = coord.y - start.y,
        deltaX = diffX > 0 ? 1 : -1,
        deltaY = diffY > 0 ? 1 : -1;

  return [...Array(total)].map((_, index) => {
    const p: Coordinates = {
      x: start.x + (index * deltaX),
      y: start.y + (index * deltaY),
    }

    return p;
  })
}

export const getLine = (start: Coordinates, coord: Coordinates): Coordinates[] => {
  const [lengthX, lengthY] = distance(start, coord);

  if (start.x === coord.x && start.y === coord.y) {
    return [ start ];
  }

  if (start.x === coord.x) {
    return getStraightLine(start, coord, 'y');
  }

  if (start.y === coord.y) {
    return getStraightLine(start, coord, 'x');
  }

  if (lengthX === lengthY && lengthX === 2) {
    return [ start, coord ];
  }

  if (lengthX === lengthY) {
    return getDiagonal(start, coord, lengthX);
  }

  return [start];
}
