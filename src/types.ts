export type Coordinates = {
  y: number,
  x: number,
};

export type WordLocationsArray = [string, string][];

/**
 * In our dataset 'location' will be always an array with a single element.
 * But I think it's a pretty cool idea to have it ready for multiple words
 * in a single challenge, and it is not much harder to consider it.
 */
export type TargetWord = {
  word: string,
  location: Coordinates[],
};
