import {GET_PROMOTIONS,ADD_PROMOTION,DELETE_PROMOTION,SELECT_PROMOTION,CLEAR_PROMOTION_STATE,GET_PROMOTION} from '../constants/promotion';
import PromotionAgent from '../agent/promotion';
import { actionTypes } from 'redux-form';

export const getPromotions = () => ( { type: GET_PROMOTIONS,payload:PromotionAgent.getPromotions()});
export const addPromotion = (promo) => ( { type: ADD_PROMOTION,payload:PromotionAgent.addPromotion(promo)});
export const getPromotion = (promoid) => ( { type: GET_PROMOTION,payload:PromotionAgent.getPromotion(promoid)});
export const selectPromotion = (promo) => ( { type: SELECT_PROMOTION,payload:promo});
export const deletePromotion = (promo) => ( { type: DELETE_PROMOTION,payload:PromotionAgent.deletePromotion(promo)});
export const clearPromotionState = (state) => ( { type: CLEAR_PROMOTION_STATE,payload:state});
export const destroyForm = () => ({type:actionTypes.DESTROY,meta:{form:["promotionWizard"]}});
