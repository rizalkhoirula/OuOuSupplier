const multer = require('multer');

// pakai memory storage karena kita tidak menyimpan lokal
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
