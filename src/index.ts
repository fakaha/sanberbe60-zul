import express from "express";
import db from "./utils/database";
import routes from "./routes/api";
import bodyParser from "body-parser";
import docs from "./docs/route";
import { join } from "path";
import { readFileSync } from "fs";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./docs/swagger_output.json";

const PORT = 3000;

async function init() {
  try {
    await db();

    const app = express();

    app.use(
      "/swagger-ui",
      express.static(join(__dirname, "../../node_modules/swagger-ui-dist"))
    );

    const swaggerCss = readFileSync(
      join(__dirname, "../../node_modules/swagger-ui-dist/swagger-ui.css"),
      "utf-8"
    );

    app.use(
      "/documentation",
      swaggerUi.serve,
      swaggerUi.setup(swaggerOutput, {
        customCss: swaggerCss,
      })
    );

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

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
