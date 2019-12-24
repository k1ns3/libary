import { AppState } from '../root.store';
import { Data } from '../state/data.model';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: AppState) => state.app.data;

export const getNpmData = createSelector(
    selectFeature,
    (state: Data) => state.npmData
);

export const getGitlabData = createSelector(
    selectFeature,
    (state: Data) => state.gitlabData
);

export const mergeData = createSelector(
    getNpmData,
    getGitlabData,
    (
        dataset1,
        dataset2
    ) => {
        return dataset1.map(o => Object.assign(o, { type: 1 }))
            .concat(dataset2.map(o => Object.assign(o, { type: 2 })));
    }
);
