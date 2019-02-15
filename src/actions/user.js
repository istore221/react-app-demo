import {GET_USERS,ADD_USER,DELETE_USER,SELECT_USER,CLEAR_USER_STATE,GET_ME} from '../constants/user';
import UserAgent from '../agent/user';

export const getUsers = () => ( { type: GET_USERS,payload:UserAgent.getUsers()});
export const addUser = (user) => ( { type: ADD_USER,payload:UserAgent.addUser(user)});
export const selectUser = (user) => ( { type: SELECT_USER,payload:user});
export const deleteUser = (user) => ( { type: DELETE_USER,payload:UserAgent.deleteUser(user)});
export const clearUserState = (state) => ( { type: CLEAR_USER_STATE,payload:state});
export const me = () => ( { type: GET_ME,payload:UserAgent.me()});
