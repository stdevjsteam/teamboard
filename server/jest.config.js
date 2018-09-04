module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupTestFrameworkScriptFile: './__tests__/setup.ts',
  testMatch: ['**/__tests__/**/*.ts'],
  testPathIgnorePatterns: ['./__tests__/mock.ts', './__tests__/setup.ts'],
  testURL: 'http://localhost'
};
