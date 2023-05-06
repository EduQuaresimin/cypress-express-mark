const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
            return config;
    },
    baseUrl: 'http://localhost:8080',
    viewportHeight: 768,
    viewportWidth: 1280,
    video: false,
    env: {
      snapshotOnly: true,
      apiUrl: 'http://localhost:3333',
      allure: true
    }
  },
});
