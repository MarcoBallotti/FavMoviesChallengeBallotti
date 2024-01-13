// jest.config.ts
import type {JestConfigWithTsJest} from 'ts-jest';
import type {Config} from 'jest';

// const config: JestConfigWithTsJest = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['./src/setup-jest.ts'],
// }

// export default config

const config: Config = {
  rootDir: '.',
  verbose: true,
  preset: 'react-native',
  setupFiles: ['./setup-jest.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|@sayem314/react-native-keep-awake).*/',
  ],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        babelConfig: true,
      },
    ],
  },

  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '\\.snap$',
    '<rootDir>/e2e/',
  ],
};

export default config;
