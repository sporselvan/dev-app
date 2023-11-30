import { SET_CURRENT_TAB_ON_STORE, SET_FILTER_CONFIG } from "../actions";

const globalIntialState = {
    currentTab:"/",
}

function globalReducers(state = globalIntialState,action){
    console.log('action',action);
     switch(action.type){
        case SET_CURRENT_TAB_ON_STORE:
            return {...state,currentTab:action.payload}
        case SET_FILTER_CONFIG:
            return {
                ...state,
                filterConfig: {
                  ...action.payload,
                },
              };
        default:
            return state;
     }
}

export default globalReducers;