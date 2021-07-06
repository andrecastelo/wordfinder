import { createContext } from 'react';

type SuccessContextProps = {
  showCongrats: () => void;
  nextChallenge: () => void;
}

export const SuccessContext = createContext<SuccessContextProps>({
  showCongrats: () => {},
  nextChallenge: () => {},
});

export const SuccessContextProvider = SuccessContext.Provider;
