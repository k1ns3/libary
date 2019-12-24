export interface User {
    readonly username?: string;
    readonly password?: string;
    readonly gitlabToken?: string;
    readonly dateTokenGitlab?: string;
    readonly token?: string;
    readonly dateNPMToken?: number;
    readonly apiErrorMessage?: string;
}
