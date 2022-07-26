const express = require("express");
const mongoose = require("mongoose");
const pasport = require("passport");
const bodyParser = require("body-parser");
// Router START
const authRoutes = require("./routes/auth");
const treeRoutes = require("./routes/tree");
// Router END
// Swagger START
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
// Swagger END
const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API-DOCS",
      version: "2.0.0",
      descriprion: "Express Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["./docs/swagger.yml"],
}; // options Swagger
const specs = swaggerJsDoc(options);

mongoose
  .connect(
    "mongodb+srv://Marcus:AdminPassword@cluster0.cxbuhbj.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected MongoDB");
  })
  .catch((errors) => {
    console.error(errors);
  });

app.use(pasport.initialize());
require("./middleware/passport")(pasport);

app.use(require("morgan")("dev"));

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("cors")());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs)); // link to swagger-docs

// Router function
app.use("/api/auth", authRoutes);
app.use("/api/tree", treeRoutes);

module.exports = app;
