import { Config } from 'jest'

const config: Config = {
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
}

export default config
