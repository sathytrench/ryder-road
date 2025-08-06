import { createContext, useContext, ReactNode } from "react";
import { AuthorsAsDict } from "../types";

const PeopleContext = createContext<Record<string, AuthorsAsDict>>({} as Record<string, AuthorsAsDict>);

export const PeopleProvider = (
  { peopleDict, children } : { peopleDict: AuthorsAsDict, children: ReactNode}
) => {
  return (
    <PeopleContext.Provider value={{ peopleDict }}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => useContext(PeopleContext);
