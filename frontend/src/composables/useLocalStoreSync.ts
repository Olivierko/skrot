import { UnwrapNestedRefs, reactive, watch } from "vue";

export type Parser<T> = (source: string) => T;
export type Validator = (source: string) => boolean;
export interface LocalStoreSyncOptions<T> {
    key: string;
    parse: Parser<T>;
    validate: Validator;
    default: T;
};

export function useLocalStoreSync<T extends object>(options: LocalStoreSyncOptions<T>) {

    const initialize = (source: UnwrapNestedRefs<T>) => {
        watch(source, (newValue, _oldValue) => {
            const stringified = JSON.stringify(newValue);
            const save = options.validate === undefined || options.validate(stringified);

            if (save) {
                localStorage.setItem(options.key, stringified);
            }
            else {
                localStorage.removeItem(options.key);
            }
        });
    };

    const copy = (source: T): T => {
        const stringified = JSON.stringify(source);
        return options.parse(stringified);
    };

    const get = (): T => {
        const source = localStorage.getItem(options.key);

        if (source && options.validate(source)) {
            return options.parse(source);
        }
        else {
            return copy(options.default);
        }
    };

    const item = reactive<T>(get());
    initialize(item);

    const reset = () => {
        const defaultCopy = copy(options.default);
        Object.assign(item, defaultCopy);
    };

    return {
        item,
        reset,
    }
};