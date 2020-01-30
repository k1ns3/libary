import { AppState } from '../root.store';
import { createSelector } from '@ngrx/store';
import { getNpmData } from './data.selectors';
import { graphData } from '../state/graph.models';

export const selectFeature = (state: AppState) => state.app.graph;


export const selectedGraph = createSelector( //Выбранное в селекте
    selectFeature,
    (state: graphData) => state.selectGraph
);

export const getOptions = createSelector( //Вывод нод в селект 
    getNpmData,
    (dataset1: Array<Object>) => createOptions(dataset1)
);

export const getGraphNodesData = createSelector( 
    getNpmData,
    selectedGraph,
    (dataset1: Array<Object>, selectedGraph: string[]) => {
        return createNodes(dataset1, selectedGraph);
    }
);

export const getGraphLinksData = createSelector(
    getNpmData,
    selectedGraph,
    (dataset1: Array<Object>, selectedGraph: string[]) => {
        return createLinks(dataset1, selectedGraph);
    }
);

function createOptions(data: any[]) {
    return data.map(v => ({ id: normId(v.name), label: `${v.name} v${v.version}`}));
}

function createLinks(data: any[], selectedNodes: string[]): Array<Object> {
    let links = []; 
    const libData = data.map(v => ({ id: normId(v.name), dependencies: v.dependencies }));
    // console.log(data);
    // console.log(libData);
    for (let i = 0; i < libData.length; i++) {
        if (libData[i].dependencies) {
            for (const item in libData[i].dependencies) {
                if (libData[i].dependencies.hasOwnProperty(item)) {
                    links = [...links,
                    {
                        source: `${libData[i].id}`,
                        target: `${normId(item)}`,
                        label: `v: ${libData[i].dependencies[item]}`
                    }
                    ];
                }
            }
        }
    }
    // todo: Если это сделать будет строить линки, без Nodes (сделать для нод)
    
    // links.filter(w => selectedNodes.find(word => word === w.target));
    // console.log(links.filter(w => selectedNodes.find(word => word === w.target)));
    return links;
}

function createNodes(data: any[], selectedNodes: string[]): Array<Object> {

    let depLibData = [];

    const generalLibData = data.map(v => ({ id: normId(v.name), label: `${v.name} v${v.version}`, isClustered: true }));
    const depArr = data.filter(s => s.dependencies !== undefined).map(v => v.dependencies);
    
    for (let i = 0; i < depArr.length; i++) {
        for (const prop in depArr[i]) {
            if (depArr[i].hasOwnProperty(prop)) {
                depLibData = [...depLibData, { id: normId(prop), label: prop, isClustered: true }];
            }
        }
    }
    let nodesData = [];
    nodesData = depLibData.concat(generalLibData);
    const uniqueArray = removedDuplicatesNodes(nodesData, 'id');
    // uniqueArray.filter(v => selectedNodes.find(k => k === v.name));
    // console.log(uniqueArray);
    return uniqueArray;
}

function normId(id: string): string {
    return id.replace(/[^\w-]*/g, '');
}

function removedDuplicatesNodes(originalArr: Array<Object>, prop: string): Array<Object> {
    let newArray = [];
    const lookupObject = {};
    for (const i in originalArr) {
        if (originalArr.hasOwnProperty(i)) {
            lookupObject[originalArr[i][prop]] = originalArr[i];
        }
    }
    for (const i in lookupObject) {
        if (lookupObject.hasOwnProperty(i)) {
            newArray = [...newArray, lookupObject[i]];
        }
    }  
    return newArray;
}
