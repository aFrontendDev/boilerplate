import React from 'react';
import {
  Switch, Route
} from 'react-router-dom';

// Pages
import SagaExample from './sagaExample.jsx';
import DynamicPage from './dynamic.jsx';
import Home from './home.jsx';

class Routes extends React.Component {
  render() {

    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/saga" component={SagaExample} />
        <Route exact path="/dynamic/:anId" component={DynamicPage} />
        <Route component={Home} />
      </Switch>
    )
  }
}

export default Routes;