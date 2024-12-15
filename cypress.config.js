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
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    cypressMochawesomeReporterReporterOptions: {
      embeddedScreenshots: true,
      reportFilename: 'mochawesome',
      reportDir: 'reports/mochawesomeReports'
    },
    mochaJunitReporterReporterOptions: {
     mochaFile: 'reports/junit/test-results-[hash].xml'
    }
  },
});
