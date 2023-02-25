import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { AppErrorException } from '~/common/exceptions';

const multerOptions: MulterOptions = {
  /** 5mb로 제한 */
  limits: { fileSize: 1024 * 1024 * 5 },
  /** only png, jpg, jpeg, gif, svg */
  fileFilter: function (_req, file, callback) {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/gif' ||
      file.mimetype == 'image/svg+xml'
    ) {
      callback(null, true);
    } else {
      callback(new AppErrorException('BadRequest', 'Unvalid Type'), false);
    }
  },
};

export default multerOptions;
