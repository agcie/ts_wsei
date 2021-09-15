// jest.config.ts
import type {Config} from '@jest/types';
const {defaults} = require('jest-config');

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
};

export default config;
module.exports = {
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    roots: ['<rootDir>'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'jsdom'
}
