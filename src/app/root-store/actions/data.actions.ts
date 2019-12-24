import { Action } from '@ngrx/store';


export enum ActionTypes {
    GET_DATA = '[Data] Data storaging',
    LOADING_NPM_DATA = '[Data] Loading Npm Data Success',
    LOADING_GITLAB_DATA = '[Data] Loading Gitlab Data Success',
    LOADED_DATA = '[Data] Loaded Data Success',
}

export class GetData implements Action {
    readonly type = ActionTypes.GET_DATA;
}

export class LoadingNpmData implements Action {
    readonly type = ActionTypes.LOADING_NPM_DATA;
    constructor(public _payload: Array<Object>) {}
}

export class LoadingGitLabData implements Action {
    readonly type = ActionTypes.LOADING_GITLAB_DATA;
    constructor(public _payload: Array<Object>) {}
}

export class LoadedData implements Action {
    readonly type = ActionTypes.LOADED_DATA;
}

export type Actions =
    | GetData
    | LoadingNpmData
    | LoadingGitLabData
    | LoadedData;
