import express from "express";

const router = express.Router();

// Get all poses
router.get("/", (req, res) => {
  res.send("Hello World");
});

// Get pose by id
router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

// Add new pose
router.post("/", (req, res) => {});

// Replace pose
router.put("/:id", (req, res) => {});

// Update pose
router.patch("/:id", (req, res) => {});

// Delete pose
router.delete("/:id", (req, res) => {});

export default router;
