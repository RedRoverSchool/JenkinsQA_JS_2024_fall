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
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
  },
  video: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    embeddedScreenshots: true,
    reportFilename: 'mochawesome',
    reportDir: 'reports/mochawesomeReports',
    mochaFile: 'reports/junit/test-results-[hash].xml',
  },
});
