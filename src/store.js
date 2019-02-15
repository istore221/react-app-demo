import { applyMiddleware, createStore ,dispatch } from 'redux';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from './reducer';

import { routerMiddleware } from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware';
import createHashHistory from 'history/createHashHistory';
import {toggleSidebar} from './actions/common';
import {REMOVE_TOKEN} from './constants/auth';
import LocalService from './agent/localservice';
import {setToken,getUser,removeToken,setUser} from './actions/auth';
import MobileDetect from 'mobile-detect';

export const history = createHashHistory();

const myMiddleware = store => next => action => {

  //catch rejected requests
  if(action.type !== "SIGNIN_REJECTED" && action.type.split('_').pop().trim() === "REJECTED"  ){

    if(action.payload.response.data.error.statusCode === 401){
      //unautharized
      store.dispatch(removeToken());

    }

  }

    switch (action.type) {
      case "SIGNIN_FULFILLED":
            LocalService.setToken(action.payload.data.id);
            LocalService.setUser(action.payload.data.user);
            store.dispatch(setToken(action.payload.data.id));
            store.dispatch(setUser(action.payload.data.user));
            next(action);
        break;
      case REMOVE_TOKEN:
              LocalService.removeToken();
              LocalService.removeUser();
              next(action);
          break;
      default:
         next(action);
    }




};

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(myRouterMiddleware,createLogger(),myMiddleware,promiseMiddleware());
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(myRouterMiddleware,createLogger(),myMiddleware,promiseMiddleware())
  }
};



const store = createStore(
  reducer, composeWithDevTools(getMiddleware()));



history.listen((location, action) => {
    const md = new MobileDetect(`${window.navigator.userAgent}`);
    if(md.mobile() && store.getState().common.sidebarOpened){
      store.dispatch(toggleSidebar());
    }

})

export default store;
