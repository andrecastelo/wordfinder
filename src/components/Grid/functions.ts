import { Coordinates, TargetWord } from '../../types';

/**
 * We flatten the characters array to build it within our CSS grid
 * implementation, then use this function to find the proper (x, y)
 * coordinates to pass to the GridItem component.
 *
 * @param index
 * @returns
 */
export const indexToCoordinates = (index: number): Coordinates => {
  return {
    y: Math.floor(index / 8),
    x: index % 8,
  }
};

/**
 * The location string we get from the data.json file is in a list of x and y
 * coordinates, following the format "x1,y1,x2,y2,x3,y3". So we need to
 * parse it properly and an array of Coordinates is better for us.
 *
 * @param location
 * @returns
 */
export const parseWordLocations = (location: string): Coordinates[] => {
  return location.split(',').reduce<Coordinates[]>((list, current, index) => {
    if (index % 2 === 0) {
      const p = { x: parseInt(current), y: -1 };
      list.push(p);
    } else {
      const last = list[list.length - 1];
      last.y = parseInt(current);
    }

    return list;
  }, []);
};

/**
 * This is basically the inverse of indexToCoordinates().
 *
 * @param param0
 * @returns
 */
export const coordinatesToIndex = ({ x, y }: Coordinates): number => x * 8 + y;

/**
 * Returns an array of distances. First index is distance in the X axis,
 * second in the Y axis.
 *
 * @param start
 * @param end
 * @returns
 */
const distance = (start: Coordinates, end: Coordinates): number[] => {
  /**
   * Initially I tried using the classic sqrt((x2 - x1)² + (y2 - y1)²) but the
   * distance from (0,0) to (1,1) is 1.414213, which is useless for us.
   *
   * Instead it is better if we get the distance as the total lengths of elements
   * between two points, in both the Y and X axis. If diffX is 0, it's a vertical
   * line, if diffY is 0 it's horizontal, and if they're equal it's a diagonal.
   *
   * Anything different and it's not a valid sequence to be checked.
   */
  const diffX = Math.abs(end.x - start.x) + 1,
        diffY = Math.abs(end.y - start.y) + 1;

  return [diffX, diffY];
};

/**
 * This is a general method that returns an array of coordinates between two
 * points, those included, as long as they're in the same axis.
 *
 * @param start
 * @param coord
 * @param direction
 * @returns
 */
const getStraightLine = (start: Coordinates, coord: Coordinates, direction: 'x' | 'y'): Coordinates[] => {
  const isReverse = start[direction] > coord[direction];
  const arrayLength = Math.abs(start[direction] - coord[direction]) + 1;
  const baseArray = [...Array(arrayLength)]; // creates an array of undefined elements

  return baseArray.map((_, index) => {
    const p: Coordinates = { x: start.x, y: start.y };
    p[direction] = start[direction] + (index * (isReverse ? -1 : 1));

    return p;
  })
};

/**
 * Returns an array of diagonal coordinates.
 *
 * @param start
 * @param coord
 * @param total
 * @returns
 */
const getDiagonal = (start: Coordinates, coord: Coordinates, total: number): Coordinates[] => {
  const diffX = coord.x - start.x,
        diffY = coord.y - start.y,
        // deltaX and deltaY determine the direction of the diagonal
        deltaX = diffX > 0 ? 1 : -1,
        deltaY = diffY > 0 ? 1 : -1;

  return [...Array(total)].map((_, index) => {
    const p: Coordinates = {
      x: start.x + (index * deltaX),
      y: start.y + (index * deltaY),
    }

    return p;
  });
};

/**
 * Returns an array of Coordinates between two points, with those included, or
 * just the start coordinate if we cannot find a valid path.
 *
 * @param start
 * @param coord
 * @returns
 */
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

  // two adjacent points are always a valid line
  if (lengthX === lengthY && lengthX === 2) {
    return [ start, coord ];
  }

  if (lengthX === lengthY) {
    return getDiagonal(start, coord, lengthX);
  }

  return [start];
};

/**
 * Basic function to check if two arrays of coordinates are equal. Reverse
 * arrays are considered equal.
 *
 * @param sequence
 * @param target
 * @returns
 */
export const checkEqual = (sequence: Coordinates[], target: Coordinates[]): boolean => {
  if (sequence.length !== target.length) {
    return false;
  }

  const reversedSequence = ([] as Coordinates[]).concat(sequence).reverse();
  const equal = (seq: Coordinates[]) => seq.every(({ x, y }, index) =>
    target[index].x === x && target[index].y === y
  );

  return equal(sequence) || equal(reversedSequence);
};

/**
 * Returns the target object that matches the sequence, or null if it does not.
 *
 * @param sequence
 * @param targets
 * @returns
 */
export const getSequenceMatch = (sequence: Coordinates[], targets: TargetWord[]): TargetWord | null => {
  const validTargets = targets.filter(({ location }) => location.length === sequence.length);

  if (!validTargets.length) {
    return null;
  }

  return validTargets.find((targetObj) => checkEqual(sequence, targetObj.location)) || null;
};