const multer = require('multer'); 
const path = require('path'); 

// multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => { // filters files that we wnat to allow
    const ext = path.extname(file.originalname); // extract extension
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') { // if its not equal to these types
      cb(new Error('File type is not supported'), false); // incase of error dont accept file 
      return; 
    }
    cb(null, true); // if files are supported, accept and pass error as null
  }
});
