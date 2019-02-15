import getAxios from '../defaults/axios';

const SelfaAgent = {
  getSelfas: () =>  getAxios().get('/selfa',{
    params: {
       filter: {
         order: 'created'
       }
    }
  }),
  getSelfa: (id) =>
    getAxios().get(`/selfa/${id}`),
  addSelfa: (o) => getAxios().post('/selfa/replaceOrCreate',o)

};

export default SelfaAgent;
