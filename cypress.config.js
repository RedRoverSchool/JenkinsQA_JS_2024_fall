const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '347hg6',
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  requestTimeout: 7000,
  defaultCommandTimeout: 7000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: false,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'reports/test-results-[hash].xml',
  },
});
