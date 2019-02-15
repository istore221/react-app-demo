import { APP_LOAD,SIDEBAR_TOGGLE,PUBLISH_ACTIVE_MENUITEM,SIGNOUT} from '../constants/common';

const defaultState = {
  appName: 'Athena',
  appLoaded: false,
  sidebarOpened: false,
  activeMenuItem: {
    breadcrumb:null
  }
};

export default (state = defaultState, action) => {

  switch (action.type) {

    case APP_LOAD:
      return {
        ...state,
        appLoaded: true
      };
    case SIDEBAR_TOGGLE:
        return {
          ...state,
          sidebarOpened:!state.sidebarOpened
        };
        case PUBLISH_ACTIVE_MENUITEM:
            return {
              ...state,
              activeMenuItem:action.payload.activeMenuItem
            };
    default:
      return state;


  }

};
