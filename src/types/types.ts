export type Coordinates = {
  y: number,
  x: number,
};

export type WordLocationsArray = [string, string][];

export type TargetWord = {
  word: string,
  location: Coordinates[],
};

export type ChallengeData = {
  source_language: string,
  word: string,
  character_grid: string[][],
  word_locations: object,
  target_language: string,
}