
const defaultState = {
  getselfaProgress:false,
  getselfaError:null,
  getselfaResponse:[],

  addselfaProgress:false,
  addselfaError:null,
  addselfaResponse:null,

  getsProgress:false,
  getsError:null,
  getsResponse:null,

};

export default (state = defaultState, action) => {

  switch (action.type) {


    case 'CLEAR_SELFA_STATE':
      return {
        ...state,
        ...action.payload
      }
      break;

      case `GET_SELFA_PENDING`:
      return {
        ...state,
        getselfaError:null,
        getselfaProgress:true,
        getselfaResponse: []
      };
      case `GET_SELFA_FULFILLED`:
      return {
        ...state,
        getselfaProgress:false,
        getselfaError:null,
        getselfaResponse: action.payload.data
      };
      case `GET_SELFA_REJECTED`:
      return {
        ...state,
        getselfaProgress:false,
        getselfaError: action.payload.response.data,
        getselfaResponse:[]

      };
      case `ADD_SELFA_PENDING`:
      return {
        ...state,
        addselfaError:null,
        addselfaProgress:true,
        addselfaResponse: []
      };
      case `ADD_SELFA_FULFILLED`:
      return {
        ...state,
        addselfaProgress:false,
        addselfaError:null,
        addselfaResponse: action.payload.data
      };
      case `ADD_SELFA_REJECTED`:
      return {
        ...state,
        addselfaProgress:false,
        addselfaError: action.payload.response.data,
        addselfaResponse:[]
      };
      case `GET_SELFA_PENDING`:
      return {
        ...state,
        getsError:null,
        getsProgress:true,
        getsResponse: []
      };
      case `GET_SELFA_FULFILLED`:
      return {
        ...state,
        getsProgress:false,
        getsError:null,
        getsResponse: action.payload.data
      };
      case `GET_SELFA_REJECTED`:
      return {
        ...state,
        getsProgress:false,
        getsError: action.payload.response.data,
        getsResponse:[]
      };
    default:
    return state;


  }

};
