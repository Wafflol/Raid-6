import {createContext, useState} from "react";

export const AppContext = createContext({
  isLoggedIn: true,
  setIsLoggedIn: () => {},
  addSignButton: true,
  setAddSignButton: () => {},
});

export const AppContextsProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [addSignButton, setAddSignButton] = useState(true);

  const resetContext = () => {
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        addSignButton,
        setAddSignButton,
        resetContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
