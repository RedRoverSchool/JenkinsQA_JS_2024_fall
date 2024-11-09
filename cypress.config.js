const { defineConfig } = require("cypress");

module.exports = defineConfig({
  requestTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
