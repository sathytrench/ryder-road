import { Link, Route, Switch } from "wouter";

import './App.css';
import { Home } from './Home';
import { Box } from './Box';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/boxes/:id">
          {params => <Box id={params.id} />}
        </Route>
        <Route path="/" component={Home} />
        <Route>404: No such page!</Route>
      </Switch>
    </div>
  );
}

export { App };
