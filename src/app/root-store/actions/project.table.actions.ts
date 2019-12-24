import { Action } from '@ngrx/store';

export const NPM_CHECKBOX_PROJECT = '[Checkbox-project] NPM_PROJECT_CHECKBOX';
export const NPM_SCOUT_CHECKBOX_PROJECT = '[Checkbox-project] NPM_SCOUT_PROJECT_CHECKBOX';
export const GITLAB_CHECKBOX_PROJECT = '[Checkbox-project] GITLAB_PROJECT_CHECKBOX';
export const SHOW_TABLE_LEGEND_PROJECT = '[Button dep] SHOW_TABLE_LEGEND';
export const SEARCH_PROJECT_INPUT_PROJECT = '[InputText project] PROJECT_SEARCH_PROJECT_INPUT';
export const SEARCH_DEP_INPUT_PROJECT = '[InputText project] PROJECT_SEARCH_DEP_INPUT';
export const ALL_SOURCE_CHECKBOX_PROJECT = '[Checkbox project] ALL_SOURCE_CHECKBOX';
export const CLEAR_SOURCE_CHECKBOX_PROJECT = '[Checkbox project] CLEAR_SOURCE_CHECKBOX';

export class NpmCheckboxProjectAction implements Action {
    readonly type = NPM_CHECKBOX_PROJECT;
}

export class NpmScoutCheckboxProjectAction implements Action {
    readonly type = NPM_SCOUT_CHECKBOX_PROJECT;
}

export class GitlabCheckboxProjectAction implements Action {
    readonly type = GITLAB_CHECKBOX_PROJECT;
}
export class ShowTablelegendProjectAction implements Action {
    readonly type = SHOW_TABLE_LEGEND_PROJECT;
}

export class SearchProjectInputProjectAction implements Action {
    readonly type = SEARCH_PROJECT_INPUT_PROJECT;
    constructor(public _payload: string) { }
}

export class SearchDepInputProjectAction implements Action {
    readonly type = SEARCH_DEP_INPUT_PROJECT;
    constructor(public _payload: string) { }
}

export class AllSourceCheckboxProjectAction implements Action {
    readonly type = ALL_SOURCE_CHECKBOX_PROJECT;
}

export class ClearSourceCheckboxProjectAction implements Action {
    readonly type = CLEAR_SOURCE_CHECKBOX_PROJECT;
}

export declare type Actions =
    | NpmCheckboxProjectAction
    | NpmScoutCheckboxProjectAction
    | GitlabCheckboxProjectAction
    | ShowTablelegendProjectAction
    | SearchProjectInputProjectAction
    | SearchDepInputProjectAction
    | AllSourceCheckboxProjectAction
    | ClearSourceCheckboxProjectAction;
