import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    private readonly _configUrl = `https://npm.scout-gps.ru:4873/-/verdaccio`;

    private _data$: Observable<any>;

    constructor(private readonly _http: HttpClient) { }

    getNpmData(token): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': token });
        const options = { headers: headers };

        return this._data$ = this._http.get<any>(`${this._configUrl}/packages`, options);
    }
}
