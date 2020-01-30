import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { Subject, BehaviorSubject, Observable, combineLatest  } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as shape from 'd3-shape';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/root-store/root.store';
import { GetData } from 'src/app/root-store/actions/data.actions';
import { getGraphNodesData, getGraphLinksData, getOptions, selectedGraph } from 'src/app/root-store/selectors/grafh.selectors';
import { SelectedGraph } from 'src/app/root-store/actions/graph.actions';


@Component({
    selector: 'app-scout-library-graph',
    templateUrl: './scout-library-graph.component.html',
    styleUrls: ['./scout-library-graph.component.scss']
})
export class ScoutLibraryGraphComponent implements OnInit, OnDestroy {
    private readonly _destroy$: Subject<any>;

    private _graphOptions: any;
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

    get graphOptions(){
       if(this._graphOptions && this._graphOptions.length){ return this._graphOptions; } 
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

        // todo : записывать в ngModal селекта значения из стейта 
        // this._store.select(selectedGraph)
        //     .pipe(takeUntil(this._destroy$))
        //     .subscribe(optionsList => this.selectedValue = optionsList.join(','));

        this._store.select(getOptions)
            .pipe(takeUntil(this._destroy$))
            .subscribe(optionsList => this._graphOptions = optionsList);

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
        // console.log(event.value);
        // console.log(this.sourceGraphNodesData, this.sourceGraphLinksData);

        // this.graphNodesData =  this.sourceGraphNodesData.filter((v: { id: string; }) => parsedSelectedLib.find(k => k === v.id));
        // this.graphLinksData =  this.sourceGraphLinksData.filter((link: { target: string; }) => parsedSelectedLib.find(w => w === link.target));

        // console.log(parsedSelectedLib, this.graphNodesData, this.graphLinksData);
        
        this._store.dispatch(new SelectedGraph(event.value));

        // this._store.dispatch(new DataSetGraphNodes(this.sourceGraphNodesData
        //     .filter((v: { id: string; }) => parsedSelectedLib
        //     .find(k => k === v.id))));

        // this._store.dispatch(new DataSetGraphLinks(this.sourceGraphLinksData
        //     .filter((link: { target: string; }) => parsedSelectedLib
        //     .find(w => w === link.target))));
        
        // this._cdRef.detectChanges();
    }

    private initData(){
        combineLatest(this.graphNodesData$, this.graphLinksData$)
            .pipe(takeUntil(this._destroy$))
            .subscribe(([graphNodesData, graphLinksData]) => {
                    console.log(`new Data`);
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
