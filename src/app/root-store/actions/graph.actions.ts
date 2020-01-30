import { Action } from '@ngrx/store';


export const SELECT_GRAPH = '[Selected] Select Graph';

export class SelectedGraph implements Action {
    readonly type = SELECT_GRAPH;
    constructor(public _payload: string[]) { }
}


export declare type Actions =
    | SelectedGraph