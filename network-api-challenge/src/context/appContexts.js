import {createContext, useState} from "react";

export const AppContext = createContext({
  isLoggedIn: true,
  setIsLoggedIn: () => {},
  addSignButton: true,
  setAddSignButton: () => {},
  doc: '',
  setDoc: () => {},
});

export const AppContextsProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [addSignButton, setAddSignButton] = useState(true);
  const [doc, setDoc] = useState('');

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
        doc,
        setDoc,
        resetContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
