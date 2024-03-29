module.exports = {
  roots: ['<rootDir>/src'],
  rootDir: './',
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+.tsx?$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  coveragePathIgnorePatterns: [
    '.dto.ts$',
    '.schema.ts$',
    '.controller.ts$',
    '.repository.ts$',
    '.module.ts$',
  ],
};
