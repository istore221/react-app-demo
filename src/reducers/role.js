import {GET_ROLES,ADD_ROLE,DELETE_ROLE,SELECT_ROLE,CLEAR_ROLE_STATE} from '../constants/role';

const defaultState = {
  getRolesProgress:false,
  getRolesError:null,
  getRolesResponse:[],

  addRoleProgress:false,
  addRoleError:null,
  addRoleResponse:null,


  deleteRoleProgress:false,
  deleteRoleError:null,
  deleteRoleResponse:null,



  selectedRole: null


};

export default (state = defaultState, action) => {

  switch (action.type) {



    case CLEAR_ROLE_STATE:
      return {
        ...state,
        ...action.payload
      }
      break;


    case `${GET_ROLES}_PENDING`:
    return {
      ...state,
      getRolesError:null,
      getRolesProgress:true,
      getRolesResponse: []
    };
    case `${GET_ROLES}_FULFILLED`:
    return {
      ...state,
      getRolesProgress:false,
      getRolesError:null,
      getRolesResponse: action.payload.data
    };
    case `${GET_ROLES}_REJECTED`:
    return {
      ...state,
      getRolesProgress:false,
      getRolesError: action.payload.response.data,
      getRolesResponse:[]

    };


    case `${ADD_ROLE}_PENDING`:
    return {
      ...state,
      addRoleError:null,
      addRoleProgress:true,
      addRoleResponse: null

    };
    case `${ADD_ROLE}_FULFILLED`:
    return {
      ...state,
      addRoleProgress:false,
      addRoleError:null,
      addRoleResponse: action.payload.data,

    };
    case `${ADD_ROLE}_REJECTED`:
    return {
      ...state,
      addRoleProgress:false,
      addRoleError: action.payload.response.data,
      addRoleResponse:null
    };

    case `${DELETE_ROLE}_PENDING`:
    return {
      ...state,
      deleteRoleError:null,
      deleteRoleProgress:true,
      deleteRoleResponse: null
    };
    case `${DELETE_ROLE}_FULFILLED`:
    return {
      ...state,
      deleteRoleError:null,
      deleteRoleProgress:false,
      deleteRoleResponse: action.payload.data
    };
    case `${DELETE_ROLE}_REJECTED`:
    return {
      ...state,
      deleteRoleError:action.payload.response.data,
      deleteRoleProgress:false,
      deleteRoleResponse: null
    };


    case SELECT_ROLE:
    return {
      ...state,
      selectedRole:action.payload

    };
    default:
    return state;


  }

};
