import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { Subject, BehaviorSubject, Observable, combineLatest  } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as shape from 'd3-shape';

import { Store } from '@ngrx/store';
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

    center$: Subject<boolean>;
    zoomToFit$: Subject<boolean>;
    update$: Subject<boolean>;
    
    draggingEnabled: Subject<boolean>;
    graphLinksData$: Observable<any>;
    graphNodesData$: Observable<any>;

    orientation = 'LR';
    fitContainer: boolean;
    
    selectedValue: string;

    public graphNodesData : object[];
    public graphLinksData : object[];
    public sourceGraphLinksData : any;
    public sourceGraphNodesData: any;
    
    get isPackages(): boolean {
        return !!(this.graphNodesData && this.graphLinksData);
    }

    constructor(
        private readonly _store: Store<AppState>,
        private readonly _cdRef: ChangeDetectorRef
    ) {
            this.curve = shape.curveCardinal;
            this.fitContainer = true;            
            this._destroy$ = new Subject(); 
            this.draggingEnabled = new Subject();
            this.center$ = new BehaviorSubject(true);
            this.zoomToFit$ = new BehaviorSubject(true);
            this.update$ = new BehaviorSubject(true);

            this._store.dispatch(new GetData());

    }

    ngOnInit() {
        this.graphNodesData$ = this._store.select(getGraphNodesData);
        this.graphLinksData$ = this._store.select(getGraphLinksData);

        this.initData();
    }

    ngOnDestroy() {
        this._destroy$.next();
    }

    OnEnableDragging(){
        this.draggingEnabled.next();
    }

    onZoomToFit() {
        this.zoomToFit$.next(true);
    }

    onCenter() {
        this.center$.next(true);
    }
    
    onUpdate(){
        this.update$.next(true);
    }

    onSetNodes(event: MatSelectChange) {
        const parsedSelectedLib: string[] = event.value.map(v => v.split(' ')[0]); 
        //console.log(parsedSelectedLib);
        // console.log(this.sourceGraphLinksData, this.graphNodesData )
        this.graphNodesData =  this.sourceGraphNodesData.filter(v => parsedSelectedLib.find(k => k === v.id));
        // this.graphLinksData =  this.sourceGraphLinksData.filter(v => v.label !== v.id);
        console.log(this.graphLinksData);
        this._cdRef.detectChanges();
    }

    private initData(){
        combineLatest(this.graphNodesData$, this.graphLinksData$)
            .pipe(takeUntil(this._destroy$))
            .subscribe(([graphNodesData, graphLinksData]) => {
                    if(graphNodesData) {
                        this.sourceGraphNodesData = graphNodesData;
                        this.graphNodesData =  this.sourceGraphNodesData;
                    }
                    if(graphLinksData) {
                        this.sourceGraphLinksData = graphLinksData;
                        this.graphLinksData =  this.sourceGraphLinksData;
                    }
            });
    }
}
