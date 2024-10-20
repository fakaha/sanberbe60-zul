import express from "express";
import db from "./utils/database";
import routes from "./routes/api";
import bodyParser from "body-parser";
import docs from "./docs/route";
import cors from "cors";

const PORT = 3000;

async function init() {
  try {
    await db();

    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Welcome to SanberShop API",
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
