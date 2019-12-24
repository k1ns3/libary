import { createSelector } from '@ngrx/store';
import { selectProjectSabString, selectDepSabString } from './project.table.selectors';
import { mergeData } from './data.selectors';

export const createdDataProjectTable = createSelector(
    mergeData,
    selectProjectSabString,
    selectDepSabString,
    (data: Array<Object>, s1: string, s2: string) => createTableData(data, s1, s2)
);

function createTableData(data: any[], projectSabString: string, depSabString: string): Array<Object> {
    let tableData = [];
    const sourceData = data.map(v => ({ id: v.name, v: v.version, dependencies: v.dependencies, t: v.type }));

    for (let i = 0; i < sourceData.length; i++) {

        if (!sourceData[i].dependencies) {
            tableData = [...tableData,
            {
                lib: `${sourceData[i].id} v: ${sourceData[i].v}`,
                type: sourceData[i].t,
                dependencies: [
                    {
                        useVersion: `---`,
                        depLib: `---`,
                        actualVersion: `---`,
                        firstPartVersion: false,
                        secondPartVersion: false,
                        lastPartVersion: false,
                        counter: 1
                    }
                ]
            }
            ];
        } else if (!isEmpty(sourceData[i].dependencies)) {
            let curDep = [];
            let counter = 0;
            for (const item in sourceData[i].dependencies) {
                if (sourceData[i].dependencies.hasOwnProperty(item)) {
                    counter++;
                    const value = sourceData.find(v => v.id === item);
                    if (value && value.v) {
                        const itemVersionArr = normVersion(value.v).split('.');
                        const valVersionArr = normVersion(sourceData[i].dependencies[item]).split('.');
                        if (itemVersionArr[0] > valVersionArr[0]) {
                            curDep = [...curDep,
                            {
                                useVersion: `${sourceData[i].dependencies[item]}`,
                                depLib: `${item}`,
                                actualVersion: `${value.v}`,
                                firstPartVersion: true,
                                secondPartVersion: false,
                                lastPartVersion: false,
                            }
                            ];
                        } else if (itemVersionArr[1] > valVersionArr[1]) {
                            curDep = [...curDep,
                            {
                                useVersion: `${sourceData[i].dependencies[item]}`,
                                depLib: `${item}`,
                                actualVersion: `${value.v}`,
                                firstPartVersion: false,
                                secondPartVersion: true,
                                lastPartVersion: false,
                            }
                            ];
                        } else if (itemVersionArr[2] > valVersionArr[2]) {
                            curDep = [...curDep,
                            {
                                useVersion: `${sourceData[i].dependencies[item]}`,
                                depLib: `${item}`,
                                actualVersion: `${value.v}`,
                                firstPartVersion: false,
                                secondPartVersion: false,
                                lastPartVersion: true,
                            }
                            ];
                        } else {
                            curDep = [...curDep,
                            {
                                useVersion: `${sourceData[i].dependencies[item]}`,
                                depLib: `${item}`,
                                actualVersion: `${value.v}`,
                                firstPartVersion: false,
                                secondPartVersion: false,
                                lastPartVersion: false,
                            }
                            ];
                        }
                    } else {
                        curDep = [...curDep,
                        {
                            useVersion: `${sourceData[i].dependencies[item]}`,
                            depLib: `${item}`,
                            actualVersion: `${sourceData[i].dependencies[item]}`,
                            firstPartVersion: false,
                            secondPartVersion: false,
                            lastPartVersion: false,
                        }
                        ];
                    }
                }

            }
            tableData = [...tableData,
            {
                lib: `${sourceData[i].id} v: ${sourceData[i].v}`,
                type: sourceData[i].t,
                dependencies: curDep,
                counter: counter
            }
            ];


        } else {
            tableData = [...tableData,
            {
                lib: `${sourceData[i].id} v: ${sourceData[i].v}`,
                type: sourceData[i].t,
                dependencies: [
                    {
                        useVersion: `---`,
                        depLib: `---`,
                        actualVersion: `---`,
                        firstPartVersion: false,
                        secondPartVersion: false,
                        lastPartVersion: false,
                        counter: 1
                    }
                ]
            }
            ];
        }
    }
    if (projectSabString) {
        tableData = tableData.filter(item => item.lib.includes(projectSabString));
    }
    if (depSabString) {
        for (const val of tableData) {
            val.dependencies = val.dependencies.filter(v => v.depLib.includes(depSabString));
        }
        return tableData;
    }
    return tableData;
}

function isEmpty(object: Object) {
    return Object.getOwnPropertyNames(object).length === 0;
}

function normVersion(v: string): string {
    return v.replace(/[^.\w-]*/g, '');
}
