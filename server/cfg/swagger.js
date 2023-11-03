module.exports = {
    definition: {
        openapi: "3.1.0",
        info: {
          title: "Stanisław Pachnik's CTK test case",
          version: "0.1.0",
          description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
          license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
          },
        },
        servers: [
          {
            url: "http://localhost",
          },
        ],
      },
      apis: ["./routes/*.js", "./models/*.js", "./controllers/*.js"]
}