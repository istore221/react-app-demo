import SelfaAgent from '../agent/selfa';


export const getSelfa = () => ( { type: 'GET_SELFA',payload:SelfaAgent.getSelfas()});
export const addSelfa = (promo) => ( { type: 'ADD_SELFA',payload:SelfaAgent.addSelfa(promo)});
export const getSelf = (promoid) => ( { type: 'GET_SELFA',payload:SelfaAgent.getSelfa(promoid)});
