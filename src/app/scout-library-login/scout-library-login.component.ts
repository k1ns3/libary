import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControlOptions, AbstractControl } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ValidateDate } from '../validators/date.validator';

import { LogIn } from '../root-store/actions/auth.actions';
import { AppState } from '../root-store/root.store';
import { User } from '../root-store/state/user.model';
import { takeUntil } from 'rxjs/operators';
import { getAuthData } from '../root-store/selectors/auth.selectors';

export type TypedControlsConfig<T> = {
    [p in keyof (T)]: [string, ValidatorFn | AbstractControlOptions | ValidatorFn[]] | FormGroup
};

@Component({
    selector: 'app-scout-library-login',
    templateUrl: './scout-library-login.component.html',
    styleUrls: ['./scout-library-login.component.scss']
})
export class ScoutLibraryLoginComponent implements OnInit, OnDestroy {

    private readonly _destroy$: Subject<any>;
    private _errorMessage: string;
    private _returnUrl: string;

    loginForm: FormGroup;
    loading = false;

    get formComtrols(): {[key: string]: AbstractControl;} {
         return this.loginForm && this.loginForm.controls; 
    }

    get errorMessage(): string {
        return this._errorMessage || '';
    }

    constructor(
        private readonly store: Store<AppState>,
        private readonly formBuilder: FormBuilder,
        private readonly route: ActivatedRoute
    ) {
        this._destroy$ = new Subject();
        this._errorMessage = '';

        const controlsConfig: TypedControlsConfig<User> = this.setAuthForm();
        this.loginForm = this.formBuilder.group(controlsConfig);

        this.store
            .pipe(
                select(getAuthData),
                takeUntil(this._destroy$)
            )
            .subscribe(
                auth => {
                    this.setFormValues(this.loginForm, auth);

                    this.loginForm.updateValueAndValidity();
                    this._errorMessage = auth.apiErrorMessage || '';
                }
            );
    }

    ngOnInit() {
        this._returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'; //????
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    onSubmit() {
        this.loading = true;

        this.store.dispatch(new LogIn({
            username: this.formComtrols.username.value || '',
            password: this.formComtrols.password.value || '',
            gitlabToken: this.formComtrols.gitlabToken.value || '',
            dateTokenGitlab: this.formComtrols.dateTokenGitlab.value || '',
            returnUrl: this._returnUrl
        }));
        console.log(this.formComtrols.dateTokenGitlab.value)
    }

    private setAuthForm(): TypedControlsConfig<User> {
        return {
            username: [
                '',
                Validators.required
            ],
            password: [
                '',
                Validators.required
            ],
            gitlabToken: [
                '',
                Validators.required
            ],
            dateTokenGitlab: [
                '0000-00-00',
                [
                    Validators.required,
                    ValidateDate
                ]
            ]
        };
    }

    private setFormValues(form: FormGroup, data: User) {
        form.setValue({
            username: data.username || '',
            password: data.password || '',
            gitlabToken: data.gitlabToken || '',
            dateTokenGitlab: data.dateTokenGitlab || '0000-00-00'
        });
    }
}
