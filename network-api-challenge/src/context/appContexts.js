import {createContext, useState} from "react";

export const AppContext = createContext({
  isLoggedIn: true,
  setIsLoggedIn: () => {},
});

export const AppContextsProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const resetContext = () => {
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        resetContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
