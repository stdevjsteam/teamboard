module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globalSetup: './__tests__/setupRunner.js',
  testMatch: ['**/__tests__/**/*.ts']
};
