import { Actions, ActionTypes } from '../actions/data.actions';
import { Data } from '../state/data.model';


const initialState: Data = {
    npmData: [],
    gitlabData: []
};

export function dataReducer(state = initialState, action: Actions): Data {
    switch (action.type) {
        case ActionTypes.LOADING_NPM_DATA: {
            const npmData = action._payload;
            return {
                ...state,
                npmData
            };
        }
        case ActionTypes.LOADING_GITLAB_DATA: {
            const gitlabData = action._payload;
            return {
                ...state,
                gitlabData
            };
        }
        default: {
            return state;
        }
    }
}
