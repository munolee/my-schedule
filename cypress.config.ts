import { defineConfig } from 'cypress';
require('dotenv').config();

export default defineConfig({
  defaultCommandTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 1024,
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:3000',
  },
});
