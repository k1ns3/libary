import { AuthActionTypes, Actions } from '../actions/auth.actions';
import { User } from '../state/user.model';

const initialState: User = {
    token: '',
    username: '',
    password: '',
    gitlabToken: '',
    dateTokenGitlab: '',
    dateNPMToken: 0,
    apiErrorMessage: ''
};

export function reducer(state = initialState, action: Actions): User {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            const token = JSON.parse(atob(action._payload.token.split('.')[1]));
            const date = token.exp * 1000;
            return {
                ...state,
                token: action._payload.token,
                username: action._payload.username,
                password: action._payload.password,
                gitlabToken: action._payload.gitlabToken,
                dateTokenGitlab: action._payload.dateTokenGitlab,
                dateNPMToken: date,
                apiErrorMessage: '',
            };
        }
        case AuthActionTypes.INCORRECT_TOKEN_GITLAB: {
            return {
                ...state,
                username: action._payload.username,
                password: action._payload.password,
                gitlabToken: action._payload.gitlabToken,
                dateTokenGitlab: action._payload.dateTokenGitlab,
                apiErrorMessage: 'Incorrect GitLab token.'
            };
        }
        case AuthActionTypes.LOGIN_FAILURE_NPM: {
            return {
                ...state,
                username: action._payload.username,
                password: action._payload.password,
                gitlabToken: action._payload.gitlabToken,
                dateTokenGitlab: action._payload.dateTokenGitlab,
                apiErrorMessage: 'Incorrect username and/or password.'
            };
        }
        case AuthActionTypes.LOGOUT: {
            return { ...state, token: '' };
        }
        default: {
            return state;
        }
    }
}
