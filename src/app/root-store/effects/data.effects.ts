import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import {
    map,
    switchMap,
    withLatestFrom
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { ActionTypes, LoadingNpmData, LoadingGitLabData } from '../actions/data.actions';

import { DataService } from 'src/app/_services/data.service';
import { GitlabDataService } from 'src/app/_services/gitlab-data.service';

import { getNpmToken, getGitlabToken } from '../selectors/auth.selectors';



@Injectable()
export class DataEffects {
    constructor(
        private store: Store<any>,
        private actions: Actions,
        private npmDataService: DataService,
        private GitlabService: GitlabDataService,
    ) { }

    @Effect()
    NpmData: Observable<any> = this.actions
        .pipe(
            ofType(ActionTypes.GET_DATA),
            withLatestFrom(this.store.select(getNpmToken)),
            switchMap(token => {
                return this.npmDataService.getNpmData(token[1])
                    .pipe(
                        map(data => new LoadingNpmData(data))
                    );
            })
        );

    @Effect()
    GitlabData: Observable<any> = this.actions
        .pipe(
            ofType(ActionTypes.GET_DATA),
            withLatestFrom(this.store.select(getGitlabToken)),
            switchMap(token => {
                return this.GitlabService.get(token[1])
                    .pipe(
                        map((data) => {
                            return new LoadingGitLabData(data);
                        })
                    );
            })
        );
}





