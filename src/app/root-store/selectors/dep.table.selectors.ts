import { AppState } from '../root.store';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: AppState) => state.app.depTablesForm;

export const selectMultiVersionsCheckbox = createSelector(
    selectFeature,
    (state) => state.MultiVersionСheckboxState
);
export const selectNotLatestVersionСheckbox = createSelector(
    selectFeature,
    (state) => state.NotLatestVersionСheckboxState
);
export const selectLatestVersionСheckbox = createSelector(
    selectFeature,
    (state) => state.LatestVersionСheckboxState
);

export const selectNPMСheckbox = createSelector(
    selectFeature,
    (state) => state.NPMСheckboxState
);
export const selectNPMScoutСheckbox = createSelector(
    selectFeature,
    (state) => state.NPMScoutСheckboxState
);

export const selectGitLabСheckbox = createSelector(
    selectFeature,
    (state) => state.GitLabСheckboxState
);

export const selectProjectSabString = createSelector(
    selectFeature,
    (state) => state.SearchProjectInput
);
export const selectDepSabString = createSelector(
    selectFeature,
    (state) => state.SearchDepInput
);
