import express from "express";
import db from "./utils/database";
import routes from "./routes/api";
import bodyParser from "body-parser";
import docs from "./docs/route";
import swaggerUi from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";

const PORT = 3000;

async function init() {
  try {
    await db();

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("public"));

    const outputFile = "./docs/swagger_output.json";
    const endpointsFiles = ["./routes/*.js"];
    const swaggerDocument = require(outputFile);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Welcome to SanberShop API"
      });
    });

    app.use("/api", routes);
    docs(app);
    // http://localhost:3000/api

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
