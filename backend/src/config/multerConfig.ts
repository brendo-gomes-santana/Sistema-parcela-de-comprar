import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {

    callback(null, path.resolve('uploads'));
    
  },
  filename: (req, file, callback) => {
    
    const fileExtension = path.extname(file.originalname);
    const fileName = `${req.user_id}${fileExtension}`;
    


    const oldFilePath = path.resolve('uploads', `${req.user_id}${fileExtension}`);
    const deleta = path.resolve('uploads', `undefined.jpeg`);

    if (fs.existsSync(oldFilePath)) {
      fs.unlink(oldFilePath, () => {
          callback(null, fileName);
      });
    }
    if (fs.existsSync(deleta)) {
      fs.unlink(deleta, () => {
        callback(null, fileName);
      });
    }

    callback(null, fileName);
  },
});
