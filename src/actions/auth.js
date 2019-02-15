import { SIGNIN,SIGNOUT,GET_USER,PUBLISH_TOKEN ,REMOVE_TOKEN,SET_USER} from '../constants/auth';
import UserAgent from '../agent/user';

export const signIn = (credentials) => ( { type: SIGNIN,payload:UserAgent.login(credentials)});
export const getUser = (userId) => ( { type: GET_USER,payload:UserAgent.getUser(userId)});
export const setToken = (token) => ( { type: PUBLISH_TOKEN,payload:token});
export const removeToken = (token) => ( { type: REMOVE_TOKEN});
export const setUser = (user) => ( { type: SET_USER,payload:user});
