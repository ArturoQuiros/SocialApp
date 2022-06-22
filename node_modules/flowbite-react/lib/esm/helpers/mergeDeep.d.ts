/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export declare function isObject(item: unknown): unknown;
/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export declare function mergeDeep(target: Record<string, unknown>, ...sources: Record<string, unknown>[]): Record<string, unknown>;
