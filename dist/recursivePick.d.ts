export declare function recursivePick<T extends {
    [key in string]: unknown;
}, PickedKeys extends string[]>(obj: T, pickedKeys: PickedKeys, pathUntilNow?: string): T;
