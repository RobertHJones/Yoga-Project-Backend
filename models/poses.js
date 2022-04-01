import mongoose from "mongoose";

const poseSchema = new mongoose.Schema({
  sanskrit: { type: String, required: true },
  english: { type: String, required: true },
  instructions: { type: String, required: true },
  series: { type: String, required: true },
  image: { type: String, required: true },
  position: { type: Number, required: true },
  strengthens: { type: String, required: false },
  stretches: { type: String, required: false },
});

export default mongoose.model("Pose", poseSchema);
