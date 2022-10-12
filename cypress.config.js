const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalSessionAndOrigin: true,
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout : 10000
});
