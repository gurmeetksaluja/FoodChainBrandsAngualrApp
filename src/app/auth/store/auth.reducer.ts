import { User } from "../user.model";
import * as AuthActions from './auth.actions';

export interface State {
    userToken: User | null;
    authError: string | null;
    loading: boolean
}

const initialState: State = {
    userToken: null,
    authError: null,
    loading: false
}

export function authReducer(
    state = initialState,
    action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS:
            const user = new User(action.payload.access_token, action.payload.token_type,
                action.payload.refresh_token,action.payload.expirationDate);
            return {
                ...state,
                authError: null,
                userToken: user,
                loading: false
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            };
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                userToken: null,
                authError: action.payload,
                loading: false
            };
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            };
        default:
            return state;
    }
}