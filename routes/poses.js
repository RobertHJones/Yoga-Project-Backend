import express from "express";
import Pose from "../models/poses.js";

const router = express.Router();

// Get all poses
router.get("/", async (req, res) => {
  try {
    const poses = await Pose.find();
    res.json({ success: true, payload: poses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get pose by id
router.get("/:id", getPoseById, (req, res) => {
  res.json({ success: true, payload: res.pose });
});

// Get pose by sanskrit
router.get("/", getPoseBySan, (req, res) => {
  res.json({ success: true, payload: res.pose });
});

// Add new pose
router.post("/", async (req, res) => {
  const pose = new Pose({
    sanskrit: req.body.sanskrit,
    english: req.body.english,
    instructions: req.body.instructions,
    series: req.body.series,
    image: req.body.image,
  });
  try {
    const newPose = await pose.save();
    res.status(201).json({ success: true, payload: newPose });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Replace pose
router.put("/:id", (req, res) => {});

// Update pose
router.patch("/:id", (req, res) => {});

// Delete pose
router.delete("/:id", getPoseById, async (req, res) => {
  try {
    await res.pose.remove();
    res.json({ success: true, payload: "Deleted pose" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPoseById(req, res, next) {
  let pose;
  try {
    pose = await Pose.findById(req.params.id);
    if (pose === null) {
      return res.status(404).json({ message: "Cannot find pose" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  // console.log(pose);
  res.pose = pose;
  next();
}

async function getPoseBySan(req, res, next) {
  let pose;
  try {
    pose = await Pose.find({ sanskrit: req.query.sanskrit }).exec();
    if (pose === null) {
      return res.status(404).json({ message: "Cannot find pose" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  console.log(pose);
  res.pose = pose;
  next();
}

export default router;
