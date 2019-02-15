import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import store,{ history} from './store';

import App from './components/App.js'

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';



ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
     <Switch>
        <Route path="/" component={App} />
       </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
