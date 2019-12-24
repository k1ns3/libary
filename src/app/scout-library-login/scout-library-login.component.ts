import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControlOptions } from '@angular/forms';

import { ValidateDate } from '../validators/date.validator';
import { Store, select } from '@ngrx/store';

import { LogIn } from '../root-store/actions/auth.actions';
import { Subject } from 'rxjs';
import { AppState } from '../root-store/root.store';
import { User } from '../root-store/state/user.model';
import { takeUntil } from 'rxjs/operators';

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

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    errorMessage: string;
    formData: any;
    testGitlab: any;

    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) {
        this._destroy$ = new Subject();
        this.errorMessage = '';

        const controlsConfig: TypedControlsConfig<User> = {
            username: [
                '',
                Validators.required
            ],
            password: ['', Validators.required],
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
        this.loginForm = this.formBuilder.group(controlsConfig);

        this.store
            .pipe(
                select(s => s.app.auth),
                takeUntil(this._destroy$)
            )
            .subscribe(
                auth => {
                    this.loginForm.controls.username.setValue(auth.username);
                    this.loginForm.controls.password.setValue(auth.password);
                    this.loginForm.controls.gitlabToken.setValue(auth.gitlabToken);
                    this.loginForm.controls.dateTokenGitlab.setValue(auth.dateTokenGitlab);
                    this.errorMessage = auth.apiErrorMessage;
                }
            );
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f(): any { return this.loginForm && this.loginForm.controls; }

    onSubmit() {
        this.loading = true;
        this.store.dispatch(new LogIn({
            username: this.f.username.value,
            password: this.f.password.value,
            gitlabToken: this.f.gitlabToken.value,
            dateTokenGitlab: this.f.dateTokenGitlab.value,
            returnUrl: this.returnUrl
        }));
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
