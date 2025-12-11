// backend/src/controllers/userController.js
import User from "../models/User.js";

export async function getMe(req, res) {
  return res.json({ user: req.user });
}

export async function updateProfile(req, res, next) {
  try {
    const { name } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true }
    ).select("-passwordHash");

    res.json({ user: updated });
  } catch (err) {
    next(err);
  }
}
