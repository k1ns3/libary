export interface DepStore {
    readonly MultiVersionСheckboxState: boolean;
    readonly NotLatestVersionСheckboxState: boolean;
    readonly LatestVersionСheckboxState: boolean;
    readonly NPMСheckboxState: boolean;
    readonly NPMScoutСheckboxState: boolean;
    readonly GitLabСheckboxState: boolean;
    readonly ShowTableLegend: boolean;
    readonly SearchProjectInput?: string;
    readonly SearchDepInput?: string;
}
