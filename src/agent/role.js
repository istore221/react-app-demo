import getAxios from '../defaults/axios';




const RoleAgent = {
  getRoles: () =>  getAxios().get('/roles',{
    params: {
       filter: {
         order: 'created'
       }
    }
  }),
  addRole: (role) => getAxios().post('/roles/replaceOrCreate',role),
  updateRole: (role) => {},
  deleteRole: (role) => getAxios().delete(`/roles/${role.id}`)

};

export default RoleAgent;
