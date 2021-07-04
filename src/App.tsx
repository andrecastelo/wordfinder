import { useState } from 'react';
import { Grid } from './components';
import { parseWordLocations } from './components/Grid/functions';
import { TargetWord, WordLocationsArray } from './types';
import data from './data.json';

const App: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);

  if (!data[currentChallenge]) {
    return <div className="tw-m-auto md:tw-max-w-4xl tw-p-8 tw-m-8">
      <h1>Nice!! Congratulations</h1>
    </div>
  }

  const characters = data[currentChallenge].character_grid;
  const wordLocations: WordLocationsArray = Object.entries(
    data[currentChallenge].word_locations
  );

  const targetWords: TargetWord[] = wordLocations.map(([location, word]) => {
    return {
      word,
      location: parseWordLocations(location),
    }
  });

  return (
    <div className="tw-m-auto md:tw-max-w-4xl tw-p-8 tw-m-8">
      <h1 className="tw-my-8">Word finder</h1>
      <Grid
        characters={characters}
        targetWords={targetWords}
        targetLanguage={data[currentChallenge].target_language}
        onSuccess={() => setCurrentChallenge(currentChallenge + 1)}
      />
    </div>
  );
};

export default App;
