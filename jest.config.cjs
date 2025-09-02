module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx,vue}',
    '!src/**/*.d.ts',
    '!src/main.ts',
    '!**/node_modules/**'
  ],
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'preserve',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true
      }
    }
  }
}