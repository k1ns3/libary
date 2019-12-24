import * as actions from '../actions/project.table.actions';

import { ProjectStore } from '../state/project.table.model';

export const initialFormState: ProjectStore = {
    NPMСheckboxState: true,
    NPMScoutСheckboxState: true,
    GitLabСheckboxState: true,
    ShowTableLegend: false,
    SearchProjectInput: ``,
    SearchDepInput: ``
};


export function projectTableReducer(state = initialFormState, action: actions.Actions) {
    switch (action.type) {
        case actions.NPM_CHECKBOX_PROJECT: {
            const NPMСheckboxState = !state.NPMСheckboxState;
            return {
                ...state, NPMСheckboxState
            };
        }
        case actions.NPM_SCOUT_CHECKBOX_PROJECT: {
            const NPMScoutСheckboxState = !state.NPMScoutСheckboxState;
            return {
                ...state, NPMScoutСheckboxState
            };
        }
        case actions.GITLAB_CHECKBOX_PROJECT: {
            const GitLabСheckboxState = !state.GitLabСheckboxState;
            return {
                ...state, GitLabСheckboxState
            };
        }
        case actions.SHOW_TABLE_LEGEND_PROJECT: {
            const ShowTableLegend = !state.ShowTableLegend;
            return {
                ...state, ShowTableLegend
            };
        }
        case actions.SEARCH_PROJECT_INPUT_PROJECT: {
            const SearchProjectInput = action._payload;
            return {
                ...state, SearchProjectInput
            };
        }
        case actions.SEARCH_DEP_INPUT_PROJECT: {
            const SearchDepInput = action._payload;
            return {
                ...state, SearchDepInput
            };
        }
        case actions.ALL_SOURCE_CHECKBOX_PROJECT: {
            const NPMСheckboxState = true;
            const NPMScoutСheckboxState = true;
            const GitLabСheckboxState = true;
            return {
                ...state,
                NPMСheckboxState,
                NPMScoutСheckboxState,
                GitLabСheckboxState
            };
        }
        case actions.CLEAR_SOURCE_CHECKBOX_PROJECT: {
            const NPMСheckboxState = false;
            const NPMScoutСheckboxState = false;
            const GitLabСheckboxState = false;
            return {
                ...state,
                NPMСheckboxState,
                NPMScoutСheckboxState,
                GitLabСheckboxState
            };
        }
        default:
            return state;
    }
}


