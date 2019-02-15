import { SIGNIN,SIGNOUT,GET_USER,PUBLISH_TOKEN,REMOVE_TOKEN,SET_USER,REMOVE_USER} from '../constants/auth';
import LocalService from '../agent/localservice';

const defaultState = {
  signinInProgress:false,
  signinResponse:null,
  signinError: null,
  token:LocalService.getToken(),
  user:LocalService.getUser()
};

export default (state = defaultState, action) => {

  switch (action.type) {

    case `${SIGNIN}_PENDING`:
        return {
          ...state,
          signinError:null,
          signinInProgress:true,
          signinResponse: null
        };
    case `${SIGNIN}_FULFILLED`:
        return {
              ...state,
              signinInProgress:false,
              signinError:null,
              signinResponse: action.payload.data
          };
    case `${SIGNIN}_REJECTED`:
              return {
                ...state,
                signinInProgress:false,
                signinError: action.payload.response.data,
                signinResponse: null

              };
    case 'SET_TOKEN':
                return {
                            ...state,
                            token: action.payload.token
                        };
    case 'GET_USER_FULFILLED':
                  return {
                        ...state,
                        user: action.payload.data
                    };

    case PUBLISH_TOKEN:
          return {
                ...state,
                token: action.payload
            };
    case REMOVE_TOKEN:
                  return {
                        ...state,
                        token: null,
                        user: null
                    };
    case SET_USER:
                  return {
                            ...state,
                             user: action.payload
                        };
    case REMOVE_USER:
                                      return {
                                                ...state,
                                                 user: null
                                            };
    default:
      return state;


  }

};
