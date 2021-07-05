import { useState } from 'react';
import { Challenge } from './components';
import data from './data.json';

const App: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);

  if (!data[currentChallenge]) {
    return <div className="tw-m-auto md:tw-max-w-4xl tw-p-8 tw-m-8">
      <h1>Nice!! Congratulations</h1>
    </div>
  }

  return <Challenge
    data={data[currentChallenge]}
    onSuccess={() => setCurrentChallenge(currentChallenge + 1)}
  />
};

export default App;
