var multer = require("multer");
var serverpath = multer.diskStorage(
  //to alocate storage location
  {
    destination: (req, file, path) => {
      path(null, "public/images");
      //null mean our localhost server we can specifyany other server IP
    },
    filename: (req, file, path) => {
     // path(null,req.body.firstname+file.originalname.substr(file.originalname.indexOf('.')))
      //(to save file by concatinating it with the first name of person by using substr function 
      //where index of read the string after specified value or point )
      path(null, file.originalname);
      //(to save file with orignal name)
    },
  }
);
var upload = multer({ storage: serverpath });
module.exports = upload;