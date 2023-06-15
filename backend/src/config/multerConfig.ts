import multer from 'multer';
import path from 'path';

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {

    callback(null, path.resolve('uploads'));
    
  },
  filename: (req, file, callback) => {
    
    const fileExtension = path.extname(file.originalname);
    const fileName = `${req.user_id}${fileExtension}`;
    
    callback(null, fileName);


  },
});
