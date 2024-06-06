import multer from 'multer';
import fs from 'fs';
import path from 'path';

const publicPath = path.join(__dirname, '../public');

const multerConfig = () => {
  const tmpPath = path.join(publicPath, 'tmp');
  const avatarsPath = path.join(publicPath, 'avatars');

  if (!fs.existsSync(tmpPath)) {
    fs.mkdirSync(tmpPath, { recursive: true });
  }

  if (!fs.existsSync(avatarsPath)) {
    fs.mkdirSync(avatarsPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, tmpPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  return multer({
    storage,
    limits: { fileSize: 8 * 1024 * 1024 }
  });
}

export default multerConfig();