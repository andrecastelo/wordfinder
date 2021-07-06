import React from 'react';
import { Grid } from '../Grid';
import { parseWordLocations } from '../../functions';
import { TargetWord, WordLocationsArray, ChallengeData } from '../../types';

type ChallengeProps = {
  data: ChallengeData,
}

export const Challenge: React.FC<ChallengeProps> = ({ data }) => {
  const characters = data.character_grid;
  const wordLocations: WordLocationsArray = Object.entries(
    data.word_locations
  );
  const source = data.word;

  const targetWords: TargetWord[] = wordLocations.map(([location, word]) => {
    return {
      word,
      source,
      location: parseWordLocations(location),
    }
  });

  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-h-screen">
      <Grid
        characters={characters}
        targetWords={targetWords}
        targetLanguage={data.target_language}
      />
    </div>
  );
};
