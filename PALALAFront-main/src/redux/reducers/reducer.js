import { appState } from "../state/state";

export const rootReducer = (state = appState, action) => {

    switch(action.type){
        case "SET_AUTH_TOKEN":
            return Object.assign({}, state, {
                authToken: action.payload,
            })
        default: 
            return state;
    }
}