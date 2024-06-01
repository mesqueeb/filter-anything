export declare function recursiveOmit<T extends {
    [key in string]: unknown;
}, OmittedKeys extends string[]>(obj: T, omittedKeys: OmittedKeys, pathUntilNow?: string): T;
