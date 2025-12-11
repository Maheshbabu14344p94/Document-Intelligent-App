import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("📩 Support Request:", { name, email, message });

    return res.json({ success: true, message: "Support request received" });
  } catch (err) {
    console.error("Support error:", err);
    res.status(500).json({ error: "Failed to submit support request" });
  }
});

export default router;
