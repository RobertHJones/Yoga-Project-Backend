import express from "express";
import mongoose from "mongoose";
import { databaseURL } from "./config.js";
const app = express();

mongoose.connect(databaseURL);
console.log(" env is", databaseURL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

import posesRouter from "./routes/poses.js";
app.use("/poses", posesRouter);

app.listen(3000, () => console.log("Server has started"));
