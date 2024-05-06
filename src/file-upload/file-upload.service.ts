import { Injectable } from '@nestjs/common';
import {
  CreateFileUploadDto,
  UpdateFileUploadDto,
} from './dto/file-upload.dto';
import { createWriteStream } from 'fs';

@Injectable()
export class FileUploadService {
  create(file: Express.Multer.File, createFileUploadDto: CreateFileUploadDto) {
    const filePath = `upload/${Date.now()}-${file.originalname}`;
    const writeStream = createWriteStream(filePath);
    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(filePath));
      writeStream.on('error', (error) => reject(error));
      writeStream.write(file.buffer);
      writeStream.end();
    });
  }

  findAll() {
    return `This action returns all fileUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileUpload`;
  }

  update(id: number, updateFileUploadDto: UpdateFileUploadDto) {
    return `This action updates a #${id} fileUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileUpload`;
  }
}
