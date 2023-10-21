const multer = require("multer");

const storage = multer.memoryStorage();
const allowedMimeTypes = ["image/jpg", "image/png", "image/jpeg"];

const fileFilter = (req, file, cb) => {
  const isAllowedMimeType = allowedMimeTypes.includes(file.mimetype);
  if (isAllowedMimeType) {
    return cb(null, true);
  }
  return cb("invalid image extension");
};

module.exports = multer({ storage, fileFilter });
