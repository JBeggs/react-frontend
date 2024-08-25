import { AuthTypes } from "../constants/actionTypes";

export default function AuthReducer(state = {}, action) { // eslint-disable-next-line
    switch(action.type) {
        case AuthTypes.LOGIN:
            return { ...state, authenticated: true, token: action.payload};
        case AuthTypes.LOGOUT:
            return { ...state, authenticated: false, token: null};
        case AuthTypes.USER_PROFILE:
            return { ...state, user: action.payload};
        case "default":
            return { ...state, user: action.payload};
    }
    return state;
}