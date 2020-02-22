export declare function recursiveFilter<T extends object, KeysToKeep extends string[], KeysToDelete extends string[]>(obj: T, fillables: KeysToKeep, guarded: KeysToDelete, pathUntilNow?: string): T;
