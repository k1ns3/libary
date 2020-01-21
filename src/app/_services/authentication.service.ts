import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private readonly _configUrl: string;
    testGitlab: any;
    returnUrl: string;

    constructor(
        private readonly _http: HttpClient,
    ) {
        this._configUrl = `https://npm.scout-corp.com:4873/-/verdaccio`;
    }

    login(username: string, password: string) {
        return this._http.post<any>(`${this._configUrl}/login`, { username, password })
            .pipe(
                map(user => {
                    return user.token;
                }));
    }
}
