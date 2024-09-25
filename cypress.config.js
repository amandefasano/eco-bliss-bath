const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      baseUrl: "http://localhost:8080/#",
      apiUrl: "http://localhost:8081",
    },
  },
});