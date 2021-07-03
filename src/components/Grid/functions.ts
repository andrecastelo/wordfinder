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

export const getLine = (start: Coordinates, coord: Coordinates): Coordinates[] => {

}
