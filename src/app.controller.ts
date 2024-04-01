import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = file.originalname.split('.')[0];
          const fileExt = file.originalname.split('.')[1];
          const newFileName =
            fileName.split(' ').join('_') + '_' + Date.now() + '.' + fileExt;

          cb(null, newFileName);
        },
      }),
    }),
  )
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    try {
      return { file: file?.filename };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
