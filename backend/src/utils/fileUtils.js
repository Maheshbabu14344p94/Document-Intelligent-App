// backend/src/utils/fileUtils.js
import fs from "fs";

export function safeUnlink(path) {
  try {
    if (path && fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.warn("⚠️ Failed to delete file:", path, err.message);
  }
}
