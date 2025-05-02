import { Route, Switch } from "wouter";

import { Home } from './Home';
import { Box } from './Box';
import { Error500 } from './Error500';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/boxes/:id">
          {params => <Box id={params.id} />}
        </Route>
        <Route path="/" component={Home} />
        <Route path="/500" component={Error500} />
        <Route>404: No such page!</Route>
      </Switch>
    </div>
  );
}

export { App };
