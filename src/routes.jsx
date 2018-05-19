import React from 'react';
import {
  Switch, Route
} from 'react-router-dom';

// Pages
import Dogs from './pages/dogs/index.jsx';
import DynamicPage from './pages/dynamic/index.jsx';
import Home from './pages/home/index.jsx';

class Routes extends React.Component {
  render() {

    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dogs" component={Dogs} />
        <Route exact path="/dynamic/:anId" component={DynamicPage} />
        <Route component={Home} />
      </Switch>
    )
  }
}

export default Routes;