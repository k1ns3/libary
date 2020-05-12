import * as actions from '../actions/graph.actions';

import { GraphData } from '../state/graph.models';

export const initialFormState: GraphData = {
    selectGraph: []
};


export function selectGraphReducer(state = initialFormState, action: actions.Actions) {
    switch (action.type) {
        case actions.SELECT_GRAPH: {
            const selectGraph = action._payload;
            return {
                ...state, selectGraph
            };
        }
        default:
            return state;
    }
}
