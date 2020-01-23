import { createSelector } from '@ngrx/store';
import { getNpmData } from './data.selectors';

export const getGraphNodesData = createSelector(
    getNpmData,
    (dataset1: Array<Object>,) => {
        return createNodes(dataset1);
    }
);

export const getGraphLinksData = createSelector(
    getNpmData,
    (dataset1: Array<Object>) => {
        return createLinks(dataset1);
    }
);

function createLinks(data: any[]): Array<Object> {
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
    // console.log(links);
    return links;
}

function createNodes(data: any[]): Array<Object> {

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
