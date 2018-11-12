module.exports = {
  moduleFileExtensions: ['tsx', 'ts', 'js'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/static/', '/types/', '/implements/'],
  setupTestFrameworkScriptFile: './implements/testing/setup.ts',
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  moduleNameMapper: {
    '^icons/(.*)': '<rootDir>/src/static/icons/$1',
    '^atoms/(.*)': '<rootDir>/src/common/components/atoms/$1',
  },
  rootDir: '../..',
  snapshotSerializers: ['enzyme-to-json/serializer', 'jest-emotion/serializer'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.test.(ts|tsx|js)'],
};
