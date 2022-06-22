"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const mergeDeep_1 = require("./mergeDeep");
(0, vitest_1.describe)('Helper / mergeDeep (Deeply merge two objects)', () => {
    (0, vitest_1.describe)('given two objects', () => {
        (0, vitest_1.it)('should combine unique shallow properties', () => {
            const combineMe = {
                a: 'a',
                b: 'b',
                c: 'c',
            };
            const withThis = {
                d: 'd',
                e: 'e',
            };
            (0, vitest_1.expect)((0, mergeDeep_1.mergeDeep)(combineMe, withThis)).toEqual({
                a: 'a',
                b: 'b',
                c: 'c',
                d: 'd',
                e: 'e',
            });
        });
        (0, vitest_1.describe)('with identical key', () => {
            (0, vitest_1.it)("should use overriding object's value", () => {
                const combineMe = {
                    base: 'base',
                    content: {
                        base: 'content',
                    },
                    flush: {
                        off: 'no-flush',
                        on: 'flush',
                    },
                };
                const withThis = {
                    base: 'new-base',
                    content: {
                        base: 'new-content',
                    },
                    flush: {
                        off: 'new-no-flush',
                        on: 'new-flush',
                    },
                };
                (0, vitest_1.expect)((0, mergeDeep_1.mergeDeep)(combineMe, withThis)).toEqual({
                    base: 'new-base',
                    content: {
                        base: 'new-content',
                    },
                    flush: {
                        off: 'new-no-flush',
                        on: 'new-flush',
                    },
                });
            });
            (0, vitest_1.describe)('that is an object', () => {
                (0, vitest_1.it)('should combine keys from both objects', () => {
                    const combineMe = {
                        content: {
                            base: 'base',
                        },
                    };
                    const withThis = {
                        content: {
                            primary: 'primary',
                        },
                    };
                    (0, vitest_1.expect)((0, mergeDeep_1.mergeDeep)(combineMe, withThis)).toEqual({
                        content: {
                            base: 'base',
                            primary: 'primary',
                        },
                    });
                });
            });
        });
    });
});
