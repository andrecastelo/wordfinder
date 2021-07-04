import { useState } from 'react';
import { Grid } from './components';
import { parseWordLocations } from './components/Grid/functions';
import data from './data.json';

type WordLocationsArray = [string, string][];

const App: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);

  const characters = data[currentChallenge].character_grid.flat();
  const wordLocations: WordLocationsArray = Object.entries(
    data[currentChallenge].word_locations
  );

  const words = [data[currentChallenge].word];
  const targetWords = wordLocations.map(([_, word]) => word);
  const targetLocations = wordLocations.map(([location, _]) =>
    parseWordLocations(location)
  );

  return (
    <div className="tw-m-auto md:tw-max-w-4xl tw-p-8 tw-m-8">
      <h1 className="tw-my-8 tw-">Word finder</h1>
      <Grid
        characters={characters}
        words={words}
        targetWords={targetWords}
        targetLocations={targetLocations}
        targetLanguage={data[currentChallenge].target_language}
      />
    </div>
  );
};

export default App;
