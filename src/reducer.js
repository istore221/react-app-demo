import { combineReducers } from 'redux';
import common from './reducers/common';
import auth from './reducers/auth';
import role from './reducers/role';
import user from './reducers/user';
import selfa from './reducers/selfa';
import promotion from './reducers/promotion';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';


export default combineReducers({
  common,
  auth,
  role,
  user,
  promotion,
  selfa,
  form:reduxFormReducer,
  routing: routerReducer
});
