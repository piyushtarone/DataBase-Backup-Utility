module.exports = {
  testEnvironment: 'node',

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json'
      }
    ]
  },

  testMatch: ['**/tests/**/*.test.js'],
  moduleFileExtensions: ['ts', 'js'],
  clearMocks: true,
};
