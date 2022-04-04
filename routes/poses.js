import express from "express";
// import res from "express/lib/response";
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
router.get("/sanskrit/:sanskrit", getPoseBySan, (req, res) => {
  res.json({ success: true, payload: res.pose });
});

// Get pose by english
router.get("/english/:english", getPoseByEng, (req, res) => {
  res.json({ success: true, payload: res.pose });
});

// Get pose by series
router.get("/series/:series", getPoseBySeries, (req, res) => {
  res.json({ success: true, payload: res.pose });
});

// Get pose by areas strengthened
router.get("/strengthens/:strengthens", getPoseByStrength, (req, res) => {
  res.json({ success: true, payload: res.pose });
});

// Get pose by areas stretched
router.get("/stretches/:stretches", getPoseByStretch, (req, res) => {
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
    position: req.body.position,
    strengthens: req.body.strengthens,
    stretches: req.body.stretches,
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
router.patch("/:id", getPoseById, async (req, res) => {
  if (req.body.sanskrit !== null) {
    res.pose.sanskrit = req.body.sanskrit;
  }
  if (req.body.english !== null) {
    res.pose.english = req.body.english;
  }
  if (req.body.instructions !== null) {
    res.pose.instructions = req.body.instructions;
  }
  if (req.body.series !== null) {
    res.pose.series = req.body.series;
  }
  if (req.body.image !== null) {
    res.pose.image = req.body.image;
  }
  if (req.body.position !== null) {
    res.pose.position = req.body.position;
  }
  if (req.body.strengthens !== null) {
    res.pose.strengthens = req.body.strengthens;
  }
  if (req.body.stretches !== null) {
    res.pose.stretches = req.body.stretches;
  }

  try {
    const updatedPose = await res.pose.save();
    res.json({ success: true, payload: updatedPose });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete pose
router.delete("/:id", getPoseById, async (req, res) => {
  try {
    await res.pose.remove();
    res.json({ success: true, payload: "Deleted pose" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// generic ID search
async function getPoseById(req, res, next) {
  let pose;
  console.log(req.params.id, "is the params");
  console.log(req.query, "is the query");
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

// generic sanskrit search
async function getPoseBySan(req, res, next) {
  let pose;
  const { sanskrit } = req.params;
  try {
    pose = await Pose.find({ sanskrit: { $regex: sanskrit, $options: "i" } });

    if (pose === null) {
      return res.status(404).json({ message: "Cannot find pose" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.pose = pose;
  next();
}
// generic english search
async function getPoseByEng(req, res, next) {
  let pose;
  const { english } = req.params;
  try {
    pose = await Pose.find({ english: { $regex: english, $options: "i" } });

    if (pose === null) {
      return res.status(404).json({ message: "Cannot find pose" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.pose = pose;
  next();
}
// search by series
async function getPoseBySeries(req, res, next) {
  let pose;
  const { series } = req.params;
  try {
    pose = await Pose.find({ series: series });

    if (pose === null) {
      return res.status(404).json({ message: "Cannot find pose" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.pose = pose;
  next();
}

// search by strengthens
async function getPoseByStrength(req, res, next) {
  let pose;
  const { strengthens } = req.params;
  try {
    pose = await Pose.find({
      strengthens: { $regex: strengthens, $options: "i" },
    });

    if (pose === null) {
      return res.status(404).json({ message: "Cannot find pose" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.pose = pose;
  next();
}

// search by stretches
async function getPoseByStretch(req, res, next) {
  let pose;
  const { stretches } = req.params;
  try {
    pose = await Pose.find({
      stretches: { $regex: stretches, $options: "i" },
    });

    if (pose === null) {
      return res.status(404).json({ message: "Cannot find pose" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.pose = pose;
  next();
}

export default router;
