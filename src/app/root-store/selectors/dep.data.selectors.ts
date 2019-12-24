import { createSelector } from '@ngrx/store';
import { selectProjectSabString, selectDepSabString } from './dep.table.selectors';
import { mergeData } from './data.selectors';

export const createdDataDepTable = createSelector(
    mergeData,
    selectProjectSabString,
    selectDepSabString,
    (data, s1, s2) => createDataDepTable(data, s1, s2)
);


function createDataDepTable(data: any[], projectSearchingString, depSearchingString) {

    const sourceData = data.map(v => ({ id: v.name, v: v.version, type: v.type, dependencies: v.dependencies }));
    const tableDataMap = new Map();

    createdDataMap(sourceData, tableDataMap);
    let tableData = [];
    createdArrOfObjFromDataMap(tableDataMap, tableData);
    summDependencyArrLength(tableData);
    findVersionInDep(sourceData, tableData);
    sortVersion(tableData);
    tableData = filteringDataSetBySearchInput(depSearchingString, projectSearchingString, tableData);
    return tableData;
}

function createdArrOfObjFromDataMap(dataMap, dataArr) {
    for (const [dependency, dependents] of dataMap.entries()) {
        let _dependents = [];

        for (const item of dependents) {
            _dependents.push({ v: item.v, id: item.id });
        }

        _dependents = _dependents.reduce((acc, i) => {
            acc[i.v] = acc[i.v] || [];
            acc[i.v].push(i.id);
            return acc;
        }, {});

        _dependents = Object.entries(_dependents);
        let curDep = [];
        for (const val of _dependents) {
            curDep = [...curDep,
            { v: val[0], libs: val[1], firstPartVersion: false, secondPartVersion: false, lastPartVersion: false }
            ];
        }
        dataArr.push(
            {
                libDep: dependency,
                dep: curDep
            }
        );

    }
}
function createdDataMap(sourceData, dataMap) {
    for (let i = 0; i < sourceData.length; i++) {
        if (!sourceData[i].dependencies) {
            continue;
        }
        for (const dependencyName in sourceData[i].dependencies) {
            if (sourceData[i].dependencies.hasOwnProperty(dependencyName)) {
                const libs = dataMap.get(dependencyName) || [];
                const lib = { id: `${sourceData[i].id} v${sourceData[i].v}`, v: sourceData[i].dependencies[dependencyName] };
                libs.push(lib);
                dataMap.set(dependencyName, libs);
            }
        }
    }
}

function findVersionInDep(sourceData, currentData) {
    for (const item of currentData) {
        const value = sourceData.find(v => v.id === item.libDep);

        if (value && value.v) {
            item.libDep = `${item.libDep} v${value.v}`;
            item.version = value.v;
        }

        if (!item.version) {
            item.version = `---`;
        }
        item.type = (value && value.type || 0);
    }
}

function sortVersion(tableData) {
    for (const item of tableData) {
        let notLatestVersion: boolean;
        if (item.depsLength > 1) {
            if (item.version !== `---`) {
                notLatestVersion = false;
                for (const val of item.dep) {
                    notLatestVersion = false;
                    (item.version > normVersion(val.v)) ? notLatestVersion = true : notLatestVersion = false;
                    const itemVersionArr = item.version.split('.');
                    const valVersionArr = normVersion(val.v).split('.');
                    (itemVersionArr[0] > valVersionArr[0])
                        ? val.firstPartVersion = true
                        : val.firstPartVersion = false;
                    (itemVersionArr[1] > valVersionArr[1] && !val.firstPartVersion)
                        ? val.secondPartVersion = true
                        : val.secondPartVersion = false;
                    (itemVersionArr[2] > valVersionArr[2] && !val.firstPartVersion && !val.secondPartVersion)
                        ? val.lastPartVersion = true
                        : val.lastPartVersion = false;
                }
                if (item.dep.find(v => v.firstPartVersion || v.secondPartVersion || v.lastPartVersion)) {
                    notLatestVersion = true;
                }
                item.notLatestVersion = notLatestVersion;
            }
        } else {
            for (const val of item.dep) {
                (item.version > normVersion(val.v)) ? item.notLatestVersion = true : item.notLatestVersion = false;
            }
        }
    }
}

function filteringDataSetBySearchInput(depSearchingString, projectSearchingString, tableData) {
    if (depSearchingString) {
        tableData = tableData.filter(item => item.libDep.includes(depSearchingString));
    }
    if (projectSearchingString) {
        const result = tableData;
        for (const val of result) {
            for (const item of val.dep) {
                item.libs = item.libs.filter(i => i.includes(projectSearchingString));
            }
            val.dep = val.dep.filter(i => i.libs.length !== 0);
        }
        tableData = result.filter(i => i.dep.length !== 0);
        summDependencyArrLength(tableData);

        return tableData;
    }

    return tableData;
}

function summDependencyArrLength(arr) {
    for (const val of arr) {
        let arrsLength = 0;
        for (let j = 0; j < val.dep.length; j++) {
            arrsLength += val.dep[j].libs.length;
        }
        val.depsLength = arrsLength;
    }
}

function normVersion(v: string): string {
    return v.replace(/[^.\w-]*/g, '');
}
