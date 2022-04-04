import express from "express";
import mongoose from "mongoose";
import { databaseURL } from "./config.js";
const app = express();

const port = process.env.PORT || 5000;

mongoose.connect(databaseURL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

import posesRouter from "./routes/poses.js";
app.use("/poses", posesRouter);

app.listen(port, () => console.log("Server has started"));
