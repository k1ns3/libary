import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, BehaviorSubject, Observable } from 'rxjs';

import * as shape from 'd3-shape';

import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/root-store/root.store';
import { GetData } from 'src/app/root-store/actions/data.actions';
import { getGraphNodesData, getGraphLinksData } from 'src/app/root-store/selectors/grafh.selectors';


@Component({
    selector: 'app-scout-library-graph',
    templateUrl: './scout-library-graph.component.html',
    styleUrls: ['./scout-library-graph.component.scss']
})
export class ScoutLibraryGraphComponent implements OnInit, OnDestroy {
    private readonly _destroy$: Subject<any>;

    readonly curve: any;

    center$: Subject<any>;
    zoomToFit$: Subject<any>;
    orientation = 'LR';
    fitContainer: boolean;
    graphLinksData$: Observable<any>;
    graphNodesData$: Observable<any>;

    constructor(
        private _store: Store<AppState>,
    ) {
        this.curve = shape.curveNatural;
        this.fitContainer = true;
        this._destroy$ = new Subject();
        this.center$ = new BehaviorSubject(true);
        this.zoomToFit$ = new BehaviorSubject(true);
    }

    ngOnInit() {
        this.graphNodesData$ = this._store.pipe(select(getGraphNodesData));
        this.graphLinksData$ = this._store.pipe(select(getGraphLinksData));
        this._store.dispatch(new GetData());
    }

    zoomToFit() {
        this.zoomToFit$.next(true);
    }

    center() {
        this.center$.next(true);
    }

    ngOnDestroy() {
        this._destroy$.next();
    }
}
