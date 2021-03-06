module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "@components\\/(.*)": "<rootDir>/src/components/$1",
        "@component": "<rootDir>/src/components",
        "@src\\/(.*)": "<rootDir>/src/$1",
    },
    setupFilesAfterEnv: [
        "<rootDir>/test/setup.ts"
    ],
    reporters: [
        "default",
        "jest-summary-reporter"
    ]
};