import { AppState } from '../root.store';
import { createSelector } from '@ngrx/store';
import { getNpmData } from './data.selectors';
import { GraphData } from '../state/graph.models';

export const selectFeature = (state: AppState) => state.app.graph;

export const selectedGraph = createSelector(
    selectFeature,
    (state: GraphData) => state.selectGraph
);

export const getOptions = createSelector(
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
    return data.map(v => ({ id: v.name, label: `${v.name} v${v.version}` }));
}

function createLinks(data: any[], selectedNodes: string[]): Array<Object> {
    let links = [];
    if (selectedNodes.length <= 0) {
        const libData = data.map(v => ({ id: normId(v.name), dependencies: v.dependencies }));
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
        return links;
    } else {
        const libData = data.filter(s => selectedNodes.find(w => s.name.includes(w || s.id)))
            .map(v => ({ id: normId(v.name), dependencies: v.dependencies }));
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
        return links;
    }
}

function createNodes(data: any[], selectedNodes: string[]): Array<Object> {

    let depLibData = [];
    if (selectedNodes.length <= 0) {
        const generalLibData = data
            .map(v => ({ id: normId(v.name), label: `${v.name} v${v.version}`, isClustered: true }));
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
        const uniqueArray: any = removedDuplicatesNodes(nodesData, 'id');
        return uniqueArray;

    } else {
        const generalLibData = data
            .filter
            (s => selectedNodes
                .find(w => s.name.includes(w || s.id)))
            .map(v => ({ id: normId(v.name), label: `${v.name} v${v.version}`, isClustered: true }));

        const depArr = data.filter
            (s => selectedNodes
                .find(w => s.name.includes(w || s.id)) && s.dependencies !== undefined)
            .map(v => v.dependencies);

        for (let i = 0; i < depArr.length; i++) {
            for (const prop in depArr[i]) {
                if (depArr[i].hasOwnProperty(prop)) {
                    depLibData = [...depLibData, { id: normId(prop), label: prop, isClustered: true }];
                }
            }
        }
        let nodesData = [];
        nodesData = depLibData.concat(generalLibData);
        const uniqueArray: any = removedDuplicatesNodes(nodesData, 'id');
        return uniqueArray;
    }
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
