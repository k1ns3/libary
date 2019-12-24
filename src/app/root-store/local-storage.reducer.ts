import { ActionReducer, Action } from '@ngrx/store';

type StateSerializator<T, S> = (state: T | undefined) => S;

export type StateSerializatorsMap<T, S> = { [p in keyof (T | S)]?: StateSerializator<T[p], S[p]> };

export function combineSerializators<T, S>(ss: StateSerializatorsMap<T, S>): StateSerializator<T, S> {
    const entries = Object.entries(ss);

    return function (state: T) {
        const s: S =
            entries.reduce(
                (p: any, [key, func]: [string, StateSerializator<T, S>]) =>
                    ({ ...p, [key]: func(state[key]) }),
                {}
            );

        return Object.assign({}, state, s);
    };
}

export interface StorageSyncReducerConfig<T, S> {
    readonly key: string;
    readonly serializators?: StateSerializatorsMap<T, S>;
    readonly deserializators?: StateSerializatorsMap<S, T>;
    readonly storage?: Storage<S>;
}

export interface Storage<T> {
    set(key: string, value: T): void;
    get(key: string): T;
}

export class LocalStorage<T> implements Storage<T> {
    set(key: string, value: T) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string): T {
        const s = localStorage.getItem(key);
        return s ? JSON.parse(s) : undefined;
    }
}

export class SessionStorage<T> implements Storage<T> {
    set(key: string, value: T) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string): T {
        const s = sessionStorage.getItem(key);
        return s ? JSON.parse(s) : undefined;
    }
}

export function storageSyncReducer<T, S>({
    key,
    deserializators = {},
    serializators = {},
    storage = new LocalStorage(),
}: StorageSyncReducerConfig<T, S>) {
    const deserialize = combineSerializators(deserializators);
    const serialize = combineSerializators(serializators);

    return function (reducer: ActionReducer<any>) {
        return function (state: T, action: Action) {
            if (!state) {
                const serialized = storage.get(key);

                if (serialized) {
                    state = deserialize(serialized);
                }
            }

            state = reducer(state, action);
            storage.set(key, serialize(state));

            return state;
        };
    };
}
