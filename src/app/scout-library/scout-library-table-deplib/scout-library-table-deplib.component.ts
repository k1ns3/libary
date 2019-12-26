import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/root-store/root.store';
import { GetData } from 'src/app/root-store/actions/data.actions';
import * as actions from '../../root-store/actions/dep.table.actions';
import { createdDataDepTable } from 'src/app/root-store/selectors/dep.data.selectors';
import {
    selectMultiVersionsCheckbox,
    selectNotLatestVersionСheckbox,
    selectLatestVersionСheckbox,
    selectGitLabСheckbox,
    selectNPMСheckbox,
    selectNPMScoutСheckbox
} from 'src/app/root-store/selectors/dep.table.selectors';

import * as visibleFilters from './utils/dep.table.visible.filters';

@Component({
    selector: 'app-scout-library-table-deplib',
    templateUrl: './scout-library-table-deplib.component.html',
    styleUrls: ['./scout-library-table-deplib.component.scss']
})
export class ScoutLibraryTableDeplibComponent implements OnInit, OnDestroy {

    private readonly _destroy$: Subject<any>;

    private checkRed: boolean;
    private checkOrange: boolean;
    private checkBlack: boolean;

    private checkNPM: boolean;
    private checkNPMScout: boolean;
    private checkGitlab: boolean;

    private subscriberonCombinedSourceFilter$: any;
    private subscriberonCombinedColorFilter$: any;

    ShowLegend: boolean;
    dataTables$: Observable<any>;
    depTableFrom$: FormGroup;

    constructor(
        private _store: Store<AppState>,
        private _formBuilder: FormBuilder,
    ) {
        this._destroy$ = new Subject();
        const controlsConfig = {
            MultiVersionСheckboxState: [true],
            NotLatestVersionСheckboxState: [true],
            LatestVersionСheckboxState: [true],
            NPMСheckboxState: [true],
            NPMScoutСheckboxState: [true],
            GitLabСheckboxState: [true],
            ShowTableLegend: [false],
            SearchDepInput: [''],
            SearchProjectInput: [''],
        };

        this.depTableFrom$ = this._formBuilder.group(controlsConfig);

        this._store
            .pipe(
                select(s => s.app.depTablesForm),
                takeUntil(this._destroy$)
            )
            .subscribe(
                depTable => {
                    this.depTableFrom$.setValue(depTable);
                }
            );
        this.subscriberonCombinedColorFilter$ =
            combineLatest(
                this._store.pipe(
                    select(selectMultiVersionsCheckbox)
                ),
                this._store.pipe(
                    select(selectNotLatestVersionСheckbox)
                ),
                this._store.pipe(
                    select(selectLatestVersionСheckbox)
                ),
            ).subscribe(
                ([MultiVersionsCheckbox, NotLatestVersionСheckbox, LatestVersionСheckbox]) => {
                    this.checkRed = MultiVersionsCheckbox;
                    this.checkOrange = NotLatestVersionСheckbox;
                    this.checkBlack = LatestVersionСheckbox;
                }
            );

        this.subscriberonCombinedSourceFilter$ =
            combineLatest(
                this._store.pipe(
                    select(selectNPMСheckbox)
                ),
                this._store.pipe(
                    select(selectNPMScoutСheckbox)
                ),
                this._store.pipe(
                    select(selectGitLabСheckbox)
                ),
            ).subscribe(
                ([NPMСheckbox, NPMScoutСheckbox, GitLabСheckbox]) => {
                    this.checkNPM = NPMСheckbox;
                    this.checkNPMScout = NPMScoutСheckbox;
                    this.checkGitlab = GitLabСheckbox;
                }
            );
    }

    ngOnInit() {
        this.dataTables$ = this._store.pipe(
            select(createdDataDepTable)
        );
        this._store.dispatch(new GetData());
    }
    
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    get f(): any { return this.depTableFrom$ && this.depTableFrom$.controls; }

    onChangedCheckRed() {
        this._store.dispatch({ type: actions.MULTI_VERSION_CHECKBOX });
        return false;
    }
    onChangedCheckOrange() {
        this._store.dispatch({ type: actions.NOT_LATEST_VERSION_CHECKBOX });
        return false;
    }
    onChangedCheckBlack() {
        this._store.dispatch({ type: actions.LATEST_VERSION_CHECKBOX });
        return false;
    }
    onChangedCheckNPM() {
        setTimeout(_ =>
            this._store.dispatch({ type: actions.NPM_CHECKBOX }));
        return false;
    }
    onChangedCheckNPMScout() {
        setTimeout(_ =>
            this._store.dispatch({ type: actions.NPM_SCOUT_CHECKBOX }));
        return false;
    }
    onChangedCheckGitlab() {
        setTimeout(_ =>
            this._store.dispatch({ type: actions.GITLAB_CHECKBOX }));
        return false;
    }
    onChangedSearchProjectInput($event) {
        setTimeout(_ =>
            this._store.dispatch(new actions.SearchProjectInput($event)));
        return ``;
    }
    onChangedSearchDepInput($event) {
        setTimeout(_ =>
            this._store.dispatch(new actions.SearchDepInput($event)));
        return ``;
    }

    onClickedClearedCheckboxColorFilter() {
        this._store.dispatch({ type: actions.CLEAR_COLOR_CHECKBOX });
    }

    onClickedAddedCheckboxColorFilter() {
        this._store.dispatch({ type: actions.ALL_COLOR_CHECKBOX });
    }
    onClickedClearedCheckboxSourceFilter() {
        this._store.dispatch({ type: actions.CLEAR_SOURCE_CHECKBOX });
    }

    onClickedAddedCheckboxSourceFilter() {
        this._store.dispatch({ type: actions.ALL_SOURCE_CHECKBOX });
    }

    onClickedShowHiddenTableLegend() {
        this._store.dispatch({ type: actions.SHOW_TABLE_LEGEND });
    }

    getCss(item) {
        if (visibleFilters.isMultiple(item) && visibleFilters.isDarkColorVersion(item)) {
            return 'darkRed';
        }
        if (visibleFilters.isMultiple(item) && visibleFilters.isMediumColorVersion(item)) {
            return 'red';
        }
        if (visibleFilters.isMultiple(item) && visibleFilters.islightColorVersion(item)) {
            return 'lightRed';
        }
        if (visibleFilters.isRed(item)) {
            return 'red';
        }
        if (visibleFilters.isNotLatest(item) && visibleFilters.isDarkColorVersion(item)) {
            return 'darkOrange';
        }
        if (visibleFilters.isNotLatest(item) && visibleFilters.isMediumColorVersion(item)) {
            return 'orange';
        }
        if (visibleFilters.isNotLatest(item) && visibleFilters.islightColorVersion(item)) {
            return 'lightOrange';
        }

        return 'black';
    }

    isVisibleColor(items) {
        const isRedItems = visibleFilters.isMultiple(items);
        const isOrangeItems = visibleFilters.isNotLatest(items);
        const isBlackItems = !isRedItems && !isOrangeItems;

        const notCheckboxColor = !this.checkRed && !this.checkOrange && !this.checkBlack;
        return isRedItems && !isOrangeItems && this.checkRed
            || isOrangeItems && this.checkOrange
            || isBlackItems && this.checkBlack
            || notCheckboxColor;
    }

    isVisibleSource(items) {
        const isNPMItems = visibleFilters.isNPM(items);
        const isScoutItems = visibleFilters.isScout(items);
        const isGitlabItems = !isNPMItems && !isScoutItems;

        const notCheckboxSource = !this.checkNPM && !this.checkNPMScout && !this.checkGitlab;
        return isNPMItems && this.checkNPM
            || isScoutItems && this.checkNPMScout
            || isGitlabItems && this.checkGitlab
            || notCheckboxSource;
    }

}
