import getAxios from '../defaults/axios';

const PromotionAgent = {
  getPromotions: () =>  getAxios().get('/promotions',{
    params: {
       filter: {
         order: 'created'
       }
    }
  }),
  getPromotion: (promotionId) =>
    getAxios().get(`/promotions/${promotionId}`),
  addPromotion: (promo) => getAxios().post('/promotions/replaceOrCreate',promo),
  updatePromotion: (promo) => {},
  deletePromotion: (promo) => getAxios().delete(`/promotions/${promo.id}`)

};

export default PromotionAgent;
