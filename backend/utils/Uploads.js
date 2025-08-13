const multer = require('multer');

// Use memory storage to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
