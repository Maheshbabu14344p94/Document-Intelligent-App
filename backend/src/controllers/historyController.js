// backend/src/controllers/historyController.js
import QueryHistory from "../models/QueryHistory.js";

export async function listHistory(req, res, next) {
  try {
    const items = await QueryHistory.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(200);

    res.json({ items });
  } catch (err) {
    next(err);
  }
}

export async function getHistoryItem(req, res, next) {
  try {
    const item = await QueryHistory.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!item) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({ item });
  } catch (err) {
    next(err);
  }
}
