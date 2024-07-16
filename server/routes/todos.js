import express from "express";
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "OK!" });
  } catch (e) {
    res.status(500).json({ message: "Failed to get data" });
  }
});

router.post("/", (req, res) => {
  try {
    const requestBody = req.body;
    if (!requestBody) {
      return res.status(400).json({
        message: "No body provided!",
      });
    }
  } catch (e) {}
});

export default router;
