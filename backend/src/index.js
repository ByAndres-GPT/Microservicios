import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import db from "./database/db.js";
import usuarioRouter from "./routes/usuario.routes.js";

db.authenticate()
  .then(() => console.log("Databse connection successful"))
  .catch((error) => console.log("Connection error: ", error));

dotenv.config();

const app = express();

app.use( cors({
    origin: '*',
}));

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usuarioRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(
  process.env.PORT,
  console.log("listening on port " + process.env.PORT)
);
