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

    if (fs.existsSync(oldFilePath)) {
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error('Erro ao excluir a imagem antiga:', err);
        }
      });
    }

    callback(null, fileName);
  },
});
