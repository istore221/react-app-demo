import { APP_LOAD,SIDEBAR_TOGGLE,PUBLISH_ACTIVE_MENUITEM,SIGNOUT } from '../constants/common';
import { actionTypes } from 'redux-form';


export const onload = () => ({ type: APP_LOAD });
export const signOut = () => ( { type: SIGNOUT});
export const toggleSidebar = () => ( { type: SIDEBAR_TOGGLE});
export const changeBreadcrumb = (menuItem) => ( { type: PUBLISH_ACTIVE_MENUITEM,payload:{
  activeMenuItem:menuItem
}});


// redux-form manual hack
export const ReduxFormChange = (state) => ({type:actionTypes.CHANGE,meta:{form:state.form,field:state.field},payload:state.value});
