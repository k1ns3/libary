import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailureNpm, LogInFailureGitlab } from '../actions/auth.actions';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthEffects {

    constructor(
        private readonly _actions: Actions,
        private readonly _authService: AuthenticationService,
        private readonly _router: Router,
        private readonly _http: HttpClient
    ) { }

    @Effect()
    LogIn: Observable<any> = this._actions.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action: LogIn) => action._payload),
        switchMap(payload =>
            this._http
                .get<any>(`https://vmgitlab01.scout-gps.ru:1443/api/v4/user?private_token=${payload.gitlabToken}`)
                .pipe(
                    switchMap(() =>
                        this._authService
                            .login(payload.username, payload.password)
                            .pipe(
                                map((user) => new LogInSuccess({
                                    token: user,
                                    username: payload.username,
                                    password: payload.password,
                                    gitlabToken: payload.gitlabToken,
                                    dateTokenGitlab: payload.dateTokenGitlab,
                                    returnUrl: payload.returnUrl
                                })),
                                catchError((error) => of(new LogInFailureNpm({
                                    error: error,
                                    username: payload.username,
                                    password: payload.password,
                                    gitlabToken: payload.gitlabToken,
                                    dateTokenGitlab: payload.dateTokenGitlab
                                })))
                            )
                    ),
                    catchError((error) => of(new LogInFailureGitlab({
                        error: error,
                        username: payload.username,
                        password: payload.password,
                        gitlabToken: payload.gitlabToken,
                        dateTokenGitlab: payload.dateTokenGitlab
                    })))
                )
        ),
    );

    @Effect({ dispatch: false })
    NavigationAfterLoginSuccess: Observable<any> = this._actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((action: LogInSuccess) => this._router.navigate([action._payload.returnUrl])),
    );
}
