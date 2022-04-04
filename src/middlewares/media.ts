import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  )
    cb(null, true);
  else cb(null, false);
};
const storage = multer.memoryStorage();

export default multer({ fileFilter, storage });
