import { useState, createContext, useEffect, useMemo } from 'react';
import { Route, Switch } from "wouter";

import { Home } from './Home';
import { Box } from './Box';
import { Error500 } from './Error500';
import { getPeople } from './api/getData';

const PeopleContext = createContext();

const App = () => {
  const [peopleDict, setPeopleDict] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await getPeople();

      if (response.status === 200) {
        const authorsAsDict = {};
        response.data.forEach(person => {
          authorsAsDict[person.id] = { sort: person.sort, name: person.name };
        })
        setPeopleDict(authorsAsDict);
      } else {
        console.error(response.message);
      }
    }

    fetchPeople();
  }, []);

  const memoizedPeopleDict = useMemo(() => {
    return peopleDict
  }, [peopleDict]);

  return (
    <div className="App">
      <PeopleContext.Provider value={memoizedPeopleDict}>
        <Switch>
        <Route path="/boxes/:id">
          {params => <Box id={params.id} />}
        </Route>
        <Route path="/" component={Home} />
        <Route path="/500" component={Error500} />
        <Route>404: No such page!</Route>
        </Switch>
      </PeopleContext.Provider>
    </div>
  );
}

export { App, PeopleContext };
