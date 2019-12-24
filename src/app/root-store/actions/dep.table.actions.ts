import { Action } from '@ngrx/store';
import { DepStore } from '../state/dep.table.model';

export const MULTI_VERSION_CHECKBOX = '[Checkbox] MULTI_VERSION_CHECKBOX';
export const NOT_LATEST_VERSION_CHECKBOX = '[Checkbox] NOT_LATEST_VERSION_CHECKBOX';
export const LATEST_VERSION_CHECKBOX = '[Checkbox] LATEST_VERSION_CHECKBOX';
export const NPM_CHECKBOX = '[Checkbox-dep] NPM_PROJECT_CHECKBOX';
export const NPM_SCOUT_CHECKBOX = '[Checkbox-dep] NPM_SCOUT_PROJECT_CHECKBOX';
export const GITLAB_CHECKBOX = '[Checkbox-dep] GITLAB_PROJECT_CHECKBOX';
export const SEARCH_PROJECT_INPUT = '[InputText dep] PROJECT_SEARCH_PROJECT_INPUT';
export const SEARCH_DEP_INPUT = '[InputText dep] PROJECT_SEARCH_DEP_INPUT';
export const SHOW_TABLE_LEGEND = '[Button dep] SHOW_TABLE_LEGEND';
export const ALL_COLOR_CHECKBOX = '[Checkbox dep] ALL_COLOR_CHECKBOX';
export const CLEAR_COLOR_CHECKBOX = '[Checkbox dep] CLEAR_COLOR_CHECKBOX';
export const ALL_SOURCE_CHECKBOX = '[Checkbox dep] ALL_SOURCE_CHECKBOX';
export const CLEAR_SOURCE_CHECKBOX = '[Checkbox dep] CLEAR_SOURCE_CHECKBOX';

export class MultiVresionCheckboxAction implements Action {
    readonly type = MULTI_VERSION_CHECKBOX;
    constructor(public payload: DepStore) { }
}

export class NotLatestVersionAction implements Action {
    readonly type = NOT_LATEST_VERSION_CHECKBOX;
    constructor(public payload: DepStore) { }
}

export class LatestVersionAction implements Action {
    readonly type = LATEST_VERSION_CHECKBOX;
    constructor(public payload: DepStore) { }
}

export class NpmCheckboxAction implements Action {
    readonly type = NPM_CHECKBOX;
}

export class NpmScoutCheckboxAction implements Action {
    readonly type = NPM_SCOUT_CHECKBOX;
}

export class GitlabCheckboxAction implements Action {
    readonly type = GITLAB_CHECKBOX;
}

export class ShowTablelegend implements Action {
    readonly type = SHOW_TABLE_LEGEND;
}

export class SearchProjectInput implements Action {
    readonly type = SEARCH_PROJECT_INPUT;
    constructor(public _payload: string) { }
}

export class SearchDepInput implements Action {
    readonly type = SEARCH_DEP_INPUT;
    constructor(public _payload: string) { }
}

export class AllColorCheckboxAction implements Action {
    readonly type = ALL_COLOR_CHECKBOX;
}

export class ClearColorCheckboxAction implements Action {
    readonly type = CLEAR_COLOR_CHECKBOX;
}

export class AllSourceCheckboxAction implements Action {
    readonly type = ALL_SOURCE_CHECKBOX;
}

export class ClearSourceCheckboxAction implements Action {
    readonly type = CLEAR_SOURCE_CHECKBOX;
}

export declare type Actions =
    | MultiVresionCheckboxAction
    | NotLatestVersionAction
    | LatestVersionAction
    | NpmCheckboxAction
    | NpmScoutCheckboxAction
    | GitlabCheckboxAction
    | ShowTablelegend
    | SearchProjectInput
    | SearchDepInput
    | AllColorCheckboxAction
    | ClearColorCheckboxAction
    | AllSourceCheckboxAction
    | ClearSourceCheckboxAction;

