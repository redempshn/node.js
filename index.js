import cors from "cors";
import express from "express";
import { initRoutes } from "./routes/routes.js";

import "./config/db.js";
import {
  createUserValid,
  updateUserValid,
} from "./middlewares/user.validation.middleware.js";
import { responseMiddleware } from "./middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "./middlewares/fighter.validation.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.use("/", express.static("./client/build"));

const port = 3333;
app.listen(port, () => {
  console.log("port: http://localhost:3333/");
});

export { app };
