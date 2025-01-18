const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
    env: {
      baseUrl: "http://localhost:8080/#",
      apiUrl: "http://localhost:8081",
      apiEmail: "testApi@test.fr",
      apiPassword: "testApi",
      funcEmail: "test2@test.fr",
      funcPassword: "testtest"

    },
  },
});