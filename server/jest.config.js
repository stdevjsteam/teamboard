module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupTestFrameworkScriptFile: './__tests__/setupRunner.js',
  testMatch: ['**/__tests__/**/*.ts'],
  testPathIgnorePatterns: ['./__tests__/mock.ts', './__tests__/setup.ts']
};
