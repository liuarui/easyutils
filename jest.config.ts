/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
    setupFiles: ['jest-canvas-mock'],
    clearMocks: true,
    collectCoverage: true,
    coverageProvider: 'v8',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx,js,jsx}', // 要收集覆盖率的文件
        '!src/**/*.d.ts', // 忽略 TypeScript 定义文件
        '!src/(main|dayjs|lodash).ts', // 忽略 入口文件
    ],
    transformIgnorePatterns: ['/node_modules/(?!(easycopyjs|lodash-es)/)'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^dayjs$': '<rootDir>/node_modules/dayjs/dayjs.min.js',
    },
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    testMatch: ['<rootDir>/**/*.test.{ts,tsx}'],
    testEnvironment: 'jsdom',
    watchman: false,
};

export default config;
