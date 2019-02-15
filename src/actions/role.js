import {GET_ROLES,ADD_ROLE,DELETE_ROLE,SELECT_ROLE,CLEAR_ROLE_STATE} from '../constants/role';
import RoleAgent from '../agent/role';

export const getRoles = () => ( { type: GET_ROLES,payload:RoleAgent.getRoles()});
export const addRole = (role) => ( { type: ADD_ROLE,payload:RoleAgent.addRole(role)});
export const selectRole = (role) => ( { type: SELECT_ROLE,payload:role});
export const deleteRole = (role) => ( { type: DELETE_ROLE,payload:RoleAgent.deleteRole(role)});
export const clearRoleState = (state) => ( { type: CLEAR_ROLE_STATE,payload:state});
