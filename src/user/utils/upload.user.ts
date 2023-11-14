import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
export const upload = FileInterceptor('photo', {
  dest: 'public',
  storage: diskStorage({
    filename: (req, file, cb) => {
      console.log(file);

      cb(null, Date.now() + '-' + file.originalname);
    },
    destination: 'public',
  }),
  fileFilter: (req, file, cb) => {
    const fileType = !['image/png', 'image/jpg', 'image/jpeg'].includes(
      file.mimetype.toLocaleLowerCase(),
    );
    if (fileType) return cb(Error('Type File not '), false);
    cb(null, true);
  },
});
