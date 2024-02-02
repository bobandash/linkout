// jest.config.js
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/support/setupTests.js'],
};
