/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Challenge, Congratulations } from './components';
import { SuccessContextProvider } from './context';
import data from './data.json';

const App: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [congratsVisible, setCongratsVisible] = useState<boolean>(false);

  const nextChallenge = () => {
    setCongratsVisible(false);
    setCurrentChallenge(currentChallenge + 1);
  }

  const showCongrats = () => {
    setCongratsVisible(true);
  }

  if (!data[currentChallenge]) {
    return (
      <Congratulations>
        <h1 className="tw-font-bold tw-text-5xl tw-gray-900 text-center">Well done!</h1>
        <p className="tw-my-8 tw-text-lg tw-gray-800 text-center">
          You've completed all {data.length} challenges!
        </p>
      </Congratulations>
    )
  }

  return (
    <div>
      <SuccessContextProvider value={{ nextChallenge, showCongrats }}>
        <Congratulations visible={congratsVisible} />
        <Challenge data={data[currentChallenge]} />
      </SuccessContextProvider>
    </div>
  );
};

export default App;
