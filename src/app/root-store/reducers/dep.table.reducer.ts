import * as actions from '../actions/dep.table.actions';

import { DepStore } from '../state/dep.table.model';

export const initialFormState: DepStore = {
    MultiVersionСheckboxState: true,
    NotLatestVersionСheckboxState: true,
    LatestVersionСheckboxState: true,
    NPMСheckboxState: true,
    NPMScoutСheckboxState: true,
    GitLabСheckboxState: true,
    ShowTableLegend: false,
    SearchProjectInput: ``,
    SearchDepInput: ``,
};


export function depTableReducer(state = initialFormState, action: actions.Actions) {
    switch (action.type) {
        case actions.MULTI_VERSION_CHECKBOX: {
            const MultiVersionСheckboxState = !state.MultiVersionСheckboxState;
            return {
                ...state, MultiVersionСheckboxState
            };
        }
        case actions.NOT_LATEST_VERSION_CHECKBOX: {
            const NotLatestVersionСheckboxState = !state.NotLatestVersionСheckboxState;

            return {
                ...state, NotLatestVersionСheckboxState
            };
        }
        case actions.LATEST_VERSION_CHECKBOX: {
            const LatestVersionСheckboxState = !state.LatestVersionСheckboxState;
            return {
                ...state, LatestVersionСheckboxState
            };
        }
        case actions.NPM_CHECKBOX: {
            const NPMСheckboxState = !state.NPMСheckboxState;
            return {
                ...state, NPMСheckboxState
            };
        }
        case actions.NPM_SCOUT_CHECKBOX: {
            const NPMScoutСheckboxState = !state.NPMScoutСheckboxState;
            return {
                ...state, NPMScoutСheckboxState
            };
        }
        case actions.GITLAB_CHECKBOX: {
            const GitLabСheckboxState = !state.GitLabСheckboxState;
            return {
                ...state, GitLabСheckboxState
            };
        }
        case actions.SHOW_TABLE_LEGEND: {
            const ShowTableLegend = !state.ShowTableLegend;
            return {
                ...state, ShowTableLegend
            };
        }
        case actions.SEARCH_PROJECT_INPUT: {
            const SearchProjectInput = action._payload;
            return {
                ...state, SearchProjectInput
            };
        }
        case actions.ALL_COLOR_CHECKBOX: {
            const MultiVersionСheckboxState = true;
            const NotLatestVersionСheckboxState = true;
            const LatestVersionСheckboxState = true;
            return {
                ...state,
                MultiVersionСheckboxState,
                NotLatestVersionСheckboxState,
                LatestVersionСheckboxState
            };
        }
        case actions.CLEAR_COLOR_CHECKBOX: {
            const MultiVersionСheckboxState = false;
            const NotLatestVersionСheckboxState = false;
            const LatestVersionСheckboxState = false;
            return {
                ...state,
                MultiVersionСheckboxState,
                NotLatestVersionСheckboxState,
                LatestVersionСheckboxState
            };
        }
        case actions.ALL_SOURCE_CHECKBOX: {
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
        case actions.CLEAR_SOURCE_CHECKBOX: {
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
        case actions.SEARCH_DEP_INPUT: {
            const SearchDepInput = action._payload;
            return {
                ...state, SearchDepInput
            };
        }
        default:
            return state;
    }
}
