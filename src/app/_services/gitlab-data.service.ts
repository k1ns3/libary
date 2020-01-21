import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GitlabDataService {

    private readonly _configUrl = 'assets/gitlab_config.json';

    constructor(private readonly _http: HttpClient) { }

    get(token: string): Observable<any> {
        return this
            ._http
            .get<any>(this._configUrl)
            .pipe(
                switchMap(configs =>
                    combineLatest(
                        configs.map(config =>
                            this.getData({ id: config.id, branch: config.default_branch, token }).pipe(
                                map(project => Object.assign(project, { name: config.name }))
                            )
                        )
                    )
                ),
            );
    }

    private getData({ id, branch, token }: { id; branch; token; }): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this._http.get(`https://git.scout-corp.com/api/v4/projects/${id}/repository/files/package.json/raw?ref=${branch}&private_token=${token}`);
    }
}
