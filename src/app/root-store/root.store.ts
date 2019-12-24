import { ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';

import { ProjectStore } from './state/project.table.model';
import { DepStore } from './state/dep.table.model';
import { User } from './state/user.model';
import { Data } from './state/data.model';

import { reducer as authReducer } from './reducers/auth.reducers';
import { dataReducer } from './reducers/data.reducers';
import { projectTableReducer } from './reducers/project.table.reducer';
import { depTableReducer } from './reducers/dep.table.reducer';

import { StateSerializatorsMap, combineSerializators, storageSyncReducer } from './local-storage.reducer';

export interface AppState {
    app: {
        projectTablesForm: ProjectStore;
        auth: User;
        data: Data;
        depTablesForm: DepStore;
    };
}

export interface AppStateJson {
    app: {
        projectTablesForm: ProjectStore;
        auth: User;
        data: Data;
        depTablesForm: DepStore;
    };
}

export const reducers: ActionReducerMap<AppState> = {
    app: combineReducers({
        projectTablesForm: projectTableReducer,
        auth: authReducer,
        data: dataReducer,
        depTablesForm: depTableReducer
    })
};

export const STORE_KEYS_TO_PERSIST = ['app'];

const serializators: StateSerializatorsMap<AppState, AppStateJson> = {
    app: combineSerializators({
        projectTablesForm: projectTablesFormData => projectTablesFormData,
        auth: authData => {
            const authStorage = {
                username: authData.username,
                token: authData.token,
                gitlabToken: authData.gitlabToken,
                dateNPMToken: authData.dateNPMToken,
                dateTokenGitlab: authData.dateTokenGitlab,
                apiErrorMessage: authData.apiErrorMessage
            };
            return authStorage;
        },
        data: dataSets => dataSets,
        depTablesForm: depTablesFormData => depTablesFormData
    })
};

const deserializators: StateSerializatorsMap<AppStateJson, AppState> = {
    app: combineSerializators({
        projectTablesForm: projectTablesFormData => projectTablesFormData,
        auth: authData => authData,
        data: dataSets => dataSets,
        depTablesForm: depTablesFormData => depTablesFormData
    })
};

export const metaReducers: Array<MetaReducer<any, any>> = [
    storageSyncReducer({
        key: 'app',
        serializators,
        deserializators,
    })
];
