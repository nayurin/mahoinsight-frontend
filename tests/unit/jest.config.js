const path = require('path')

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/unit/__mocks__/fileres.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/unit/__mocks__/style.js'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  testMatch: [
    '<rootDir>/tests/unit/specs/*.spec.js',
    '<rootDir>/tests/unit/specs/components/global/*.spec.js',
    '<rootDir>/tests/unit/specs/components/items/*.spec.js',
    '<rootDir>/tests/unit/specs/components/princesses/*.spec.js',
  ],
  testPathIgnorePatterns: [],
  setupFiles: ['<rootDir>/tests/unit/setup.js'],
  // coverageDirectory: '<rootDir>/test/coverage',
  // coverageReporters: ["html", "text-summary"],
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   'src/**/*.{js,vue}',
  //   '!src/main.js',
  //   '!src/router/index.js',
  //   '!**/node_modules/**',
  // ]
}
