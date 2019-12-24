import { Action } from '@ngrx/store';
import { LogInPayload, LogInSuccessPayload, LogInFailurePayload } from '../state/auth.payload.models';


export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE_NPM = '[Auth] NPM login error',
    INCORRECT_TOKEN_GITLAB = '[Auth] Gitlab token error',
    LOGOUT = '[Auth] Logout'
}

export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public _payload: LogInPayload) { }
}

export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public _payload: LogInSuccessPayload) { }
}

export class LogInFailureNpm implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE_NPM;
    constructor(public _payload: LogInFailurePayload) { }
}

export class LogInFailureGitlab implements Action {
    readonly type = AuthActionTypes.INCORRECT_TOKEN_GITLAB;
    constructor(public _payload: LogInFailurePayload) { }
}

export class LogOut implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export type Actions =
    | LogIn
    | LogInSuccess
    | LogInFailureNpm
    | LogInFailureGitlab
    | LogOut;
