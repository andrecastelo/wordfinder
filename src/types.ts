export type Coordinates = {
  y: number,
  x: number,
};

export type WordLocationsArray = [string, string][];

export type TargetWord = {
  word: string,
  location: Coordinates[],
};
