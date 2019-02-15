import {GET_USERS,ADD_USER,DELETE_USER,SELECT_USER,CLEAR_USER_STATE,GET_ME} from '../constants/user';
import LocalService from '../agent/localservice';

const defaultState = {
  getUsersProgress:false,
  getUsersError:null,
  getUsersResponse:[],

  getMeProgress:false,
  getMeError:null,
  getMeResponse:null,

  addUserProgress:false,
  addUserError:null,
  addUserResponse:null,


  deleteUserProgress:false,
  deleteUserError:null,
  deleteUserResponse:null,



  selectedUser: null


};

export default (state = defaultState, action) => {

  switch (action.type) {



    case CLEAR_USER_STATE:
      return {
        ...state,
        ...action.payload
      }
      break;


    case `${GET_USERS}_PENDING`:
    return {
      ...state,
      getUsersError:null,
      getUsersProgress:true,
      getUsersResponse: []
    };
    case `${GET_USERS}_FULFILLED`:
    return {
      ...state,
      getUsersProgress:false,
      getUsersError:null,
      getUsersResponse: action.payload.data.filter(user=>LocalService.getUser().id != user.id)
    };
    case `${GET_USERS}_REJECTED`:
    return {
      ...state,
      getUsersProgress:false,
      getUsersError: action.payload.response.data,
      getUsersResponse:[]

    };


    case `${ADD_USER}_PENDING`:
    return {
      ...state,
      addUserError:null,
      addUserProgress:true,
      addUserResponse: null

    };
    case `${ADD_USER}_FULFILLED`:
    return {
      ...state,
      addUserProgress:false,
      addUserError:null,
      addUserResponse: action.payload.data,

    };
    case `${ADD_USER}_REJECTED`:
    return {
      ...state,
      addUserProgress:false,
      addUserError: action.payload.response.data,
      addUserResponse:null
    };



    case `${GET_ME}_PENDING`:
    return {
      ...state,
      getMeError:null,
      getMeProgress:true,
      getMeResponse: null

    };
    case `${GET_ME}_FULFILLED`:
    return {
      ...state,
      getMeProgress:false,
      getMeError:null,
      getMeResponse: action.payload.data,

    };
    case `${GET_ME}_REJECTED`:
    return {
      ...state,
      getMeProgress:false,
      getMeError: action.payload.response.data,
      getMeResponse:null
    };



    case `${DELETE_USER}_PENDING`:
    return {
      ...state,
      deleteUserError:null,
      deleteUserProgress:true,
      deleteUserResponse: null
    };
    case `${DELETE_USER}_FULFILLED`:
    return {
      ...state,
      deleteUserError:null,
      deleteUserProgress:false,
      deleteUserResponse: action.payload.data
    };
    case `${DELETE_USER}_REJECTED`:
    return {
      ...state,
      deleteUserError:action.payload.response.data,
      deleteUserProgress:false,
      deleteUserResponse: null
    };


    case SELECT_USER:
    return {
      ...state,
      selectedUser:action.payload

    };


    default:
    return state;


  }

};
