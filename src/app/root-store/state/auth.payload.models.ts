export interface LogInPayload {
    readonly username: string;
    readonly password: string;
    readonly gitlabToken: string;
    readonly dateTokenGitlab: string;
    readonly returnUrl: string;
}

export interface LogInSuccessPayload {
    readonly token: string;
    readonly username: string;
    readonly password: string;
    readonly gitlabToken: string;
    readonly dateTokenGitlab: string;
    readonly returnUrl: string;
}

export interface LogInFailurePayload {
    readonly username: string;
    readonly password: string;
    readonly gitlabToken: string;
    readonly dateTokenGitlab: string;
    readonly error: string;
}
