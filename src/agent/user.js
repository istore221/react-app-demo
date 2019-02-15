import {API_ENDPOINT} from '../constants/const';
import getAxios from '../defaults/axios';
import LocalService from '../agent/localservice';



const UserAgent = {
  current: () =>
    getAxios().get('/users/me'),
  login: (credentials) =>
    getAxios().post('/users/login', credentials),
  getUser: (userId) =>
    getAxios().get(`/users/${userId}`),
  getUsers: () =>  getAxios().get('/users',{
      params: {
         filter: {
           order: 'created',
           include:'roles'
         }
      }
    }),
    addUser: (user) => getAxios().post('/users/replaceOrCreateUserWithRoles',user),
    updateUser: (user) => {},
    deleteUser: (user) => getAxios().delete(`/users/${user.id}`),
    me: () => getAxios().get(`/users/me`)
};

export default UserAgent;
