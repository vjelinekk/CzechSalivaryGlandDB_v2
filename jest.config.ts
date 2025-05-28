import { Config } from 'jest'

const config: Config = {
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '@react-pdf/renderer': '<rootDir>/__mocks__/@react-pdf/renderer.js',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(@react-pdf/renderer|@react-pdf/primitives)/)',
    ],
}

export default config
