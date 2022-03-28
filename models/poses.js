import mongoose from "mongoose";

const posesSchema = new mongoose.Schema({
  "Sanskrit name": { type: String, required: true },
  "English name": { type: String, required: true },
  instructions: { type: String, required: true },
  series: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Pose", posesSchema);
