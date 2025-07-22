import { createContext, useContext } from "react";

const PeopleContext = createContext(undefined);

export const PeopleProvider = ({ peopleDict, children }) => {
  return (
    <PeopleContext.Provider value={{ peopleDict }}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => useContext(PeopleContext);
