import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';

const imageFileFilter = (_req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Chỉ được upload ảnh'), false);
  }
  callback(null, true);
};
const imageFileName = (_req, file, callback) => {
  const filename =
    Date.now() + path.parse(file.originalname).name.replace(/\s/g, '');
  const extension = path.parse(file.originalname).ext;
  callback(null, `${filename}${extension}`);
};

@ApiTags('Upload')
@Controller('upload')
@ApiBearerAuth()
export class UploadController {
  constructor() {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './uploads',
        filename: imageFileName,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Upload file không hợp lệ.');
    return file;
  }
}
