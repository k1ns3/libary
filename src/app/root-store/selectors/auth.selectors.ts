import { AppState } from '../root.store';
import { User } from '../state/user.model';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: AppState) => state.app.auth;

export const getNpmToken = createSelector(
    selectFeature,
    (state: User) => state.token
);

export const getGitlabToken = createSelector(
    selectFeature,
    (state: User) => state.gitlabToken
);

export const getNpmTokenDate = createSelector(
    selectFeature,
    (state: User) => state.dateNPMToken
);

export const getGitlabTokenDate = createSelector(
    selectFeature,
    (state: User) => state.dateTokenGitlab
);

export const getErrorMessageNpm = createSelector(
    selectFeature,
    (state: User) => state.apiErrorMessage
);
