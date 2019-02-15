import {GET_PROMOTIONS,ADD_PROMOTION,DELETE_PROMOTION,SELECT_PROMOTION,CLEAR_PROMOTION_STATE,GET_PROMOTION} from '../constants/promotion';

const defaultState = {
  getPromotionsProgress:false,
  getPromotionsError:null,
  getPromotionsResponse:[],

  addPromotionProgress:false,
  addPromotionError:null,
  addPromotionResponse:null,


  deletePromotionProgress:false,
  deletePromotionError:null,
  deletePromotionResponse:null,

  getPromotionProgress:false,
  getPromotionError:null,
  getPromotionResponse:null,


  selectedPromotion: null,

  activeStep: 1,

  selectedRules: [],

  selectedSource: null,

  selectedSourceFormat: null


};

export default (state = defaultState, action) => {

  switch (action.type) {



    case CLEAR_PROMOTION_STATE:
      return {
        ...state,
        ...action.payload
      }
      break;




      case `${GET_PROMOTION}_PENDING`:
      return {
        ...state,
        getPromotionError:null,
        getPromotionProgress:true,
        getPromotionResponse: []
      };
      case `${GET_PROMOTION}_FULFILLED`:
      return {
        ...state,
        getPromotionProgress:false,
        getPromotionError:null,
        getPromotionResponse: action.payload.data
      };
      case `${GET_PROMOTION}_REJECTED`:
      return {
        ...state,
        getPromotionProgress:false,
        getPromotionError: action.payload.response.data,
        getPromotionResponse:[]

      };


    case `${GET_PROMOTIONS}_PENDING`:
    return {
      ...state,
      getPromotionsError:null,
      getPromotionsProgress:true,
      getPromotionsResponse: []
    };
    case `${GET_PROMOTIONS}_FULFILLED`:
    return {
      ...state,
      getPromotionsProgress:false,
      getPromotionsError:null,
      getPromotionsResponse: action.payload.data
    };
    case `${GET_PROMOTIONS}_REJECTED`:
    return {
      ...state,
      getPromotionsProgress:false,
      getPromotionsError: action.payload.response.data,
      getPromotionsResponse:[]

    };


    case `${ADD_PROMOTION}_PENDING`:
    return {
      ...state,
      addPromotionError:null,
      addPromotionProgress:true,
      addPromotionResponse: null

    };
    case `${ADD_PROMOTION}_FULFILLED`:
    return {
      ...state,
      addPromotionProgress:false,
      addPromotionError:null,
      addPromotionResponse: action.payload.data,

    };
    case `${ADD_PROMOTION}_REJECTED`:
    return {
      ...state,
      addPromotionProgress:false,
      addPromotionError: action.payload.response.data,
      addPromotionResponse:null
    };


    case `${DELETE_PROMOTION}_PENDING`:
    return {
      ...state,
      deletePromotionError:null,
      deletePromotionProgress:true,
      deletePromotionResponse: null
    };
    case `${DELETE_PROMOTION}_FULFILLED`:
    return {
      ...state,
      deletePromotionError:null,
      deletePromotionProgress:false,
      deletePromotionResponse: action.payload.data
    };
    case `${DELETE_PROMOTION}_REJECTED`:
    return {
      ...state,
      deletePromotionError:action.payload.response.data,
      deletePromotionProgress:false,
      deletePromotionResponse: null
    };


    case SELECT_PROMOTION:
    return {
      ...state,
      selectedPromotion:action.payload

    };
    default:
    return state;


  }

};
