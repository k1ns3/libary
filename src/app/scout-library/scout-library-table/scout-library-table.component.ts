import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';

import * as actions from '../../root-store/actions/project.table.actions';

import { GetData } from 'src/app/root-store/actions/data.actions';
import { createdDataProjectTable } from 'src/app/root-store/selectors/project.data.selectors';
import { AppState } from 'src/app/root-store/root.store';
import { selectNPMСheckbox, selectNPMScoutСheckbox, selectGitLabСheckbox } from 'src/app/root-store/selectors/project.table.selectors';
import { SearchDepInputProjectAction, SearchProjectInputProjectAction } from '../../root-store/actions/project.table.actions';

@Component({
    selector: 'app-scout-library-table',
    templateUrl: './scout-library-table.component.html',
    styleUrls: ['./scout-library-table.component.scss']
})

export class ScoutLibraryTableComponent implements OnInit, OnDestroy {

    private readonly _destroy$: Subject<any>;

    private subscriberonCombinedSourceFilter$: any;
    private checkNPM: boolean;
    private checkNPMScout: boolean;
    private checkGitlab: boolean;

    dataTables$: Observable<any>;
    projectTableForm: FormGroup;
    public dataSourceTable: object[];
    public sourceDataSourceTable: any;

    get isPackages(): boolean {
        return !!(this.dataSourceTable);
    }

    constructor(
        private readonly _store: Store<AppState>,
        private readonly _formBuilder: FormBuilder,
    ) {
        this._destroy$ = new Subject();
        const controlsConfig = {
            NPMСheckboxState: [true],
            NPMScoutСheckboxState: [true],
            GitLabСheckboxState: [true],
            ShowTableLegend: [false],
            SearchDepInput: [''],
            SearchProjectInput: [''],
        };

        this.projectTableForm = this._formBuilder.group(controlsConfig);

        this._store
            .pipe(
                select(s => s.app.projectTablesForm),
                takeUntil(this._destroy$)
            )
            .subscribe(
                projectTable => {
                    this.projectTableForm.setValue(projectTable);
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
            ).pipe(tap(v => console.log(v))).subscribe(
                ([NPMСheckbox, NPMScoutСheckbox, GitLabСheckbox]) => {
                    this.checkNPM = NPMСheckbox;
                    this.checkNPMScout = NPMScoutСheckbox;
                    this.checkGitlab = GitLabСheckbox;
                }
            );
    }

    ngOnInit() {
        this._store.dispatch(new GetData());

        this.dataTables$ = this._store.pipe(
            select(createdDataProjectTable)
        );
        this.initData();
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    get f(): any { return this.projectTableForm && this.projectTableForm.controls; }

    isVisibleSource(items): boolean {

        const isNPM = this.isNPM(items);
        const isScout = this.isScout(items);
        const isGitlab = !isNPM && !isScout;

        const notCheckboxSource = !this.checkNPM && !this.checkNPMScout && !this.checkGitlab;

        return isNPM && this.checkNPM || isScout && this.checkNPMScout || isGitlab && this.checkGitlab || notCheckboxSource;
    }

    private isNPM(items): boolean {
        return items.type === 0;
    }

    private isScout(items): boolean {
        return items.type === 1;
    }

    getCss(items): string {
        if (items.firstPartVersion) {
            return 'darkRed';
        }
        if (items.secondPartVersion) {
            return 'red';
        }
        if (items.lastPartVersion) {
            return 'lightRed';
        }
        return 'black';
    }
    onChangedCheckNPM() {
        this._store.dispatch({ type: actions.NPM_CHECKBOX_PROJECT });
    }
    onChangedCheckNPMScout() {
        this._store.dispatch({ type: actions.NPM_SCOUT_CHECKBOX_PROJECT });
    }
    onChangedCheckGitlab() {
        this._store.dispatch({ type: actions.GITLAB_CHECKBOX_PROJECT });
    }
    onChangedSearchProjectInput($event) {
        this._store.dispatch(new SearchProjectInputProjectAction($event));
    }
    onChangedSearchDepInput($event) {
        this._store.dispatch(new SearchDepInputProjectAction($event));
    }
    onClickedClearedCheckboxSourceFilter() {
        this._store.dispatch({ type: actions.CLEAR_SOURCE_CHECKBOX_PROJECT });
    }

    onClickedAddedCheckboxSourceFilter() {
        this._store.dispatch({ type: actions.ALL_SOURCE_CHECKBOX_PROJECT });
    }

    onClickedShowHiddenTableLegend() {
        this._store.dispatch({ type: actions.SHOW_TABLE_LEGEND_PROJECT });
    }

    private initData() {
        combineLatest(this.dataTables$)
            .pipe(takeUntil(this._destroy$))
            .subscribe(([dataSourceTable]) => {
                console.log(dataSourceTable);
                console.log(`new Data`);
                if (dataSourceTable) {
                    this.sourceDataSourceTable = dataSourceTable;
                    this.dataSourceTable = this.sourceDataSourceTable;
                }
            });
    }

}
