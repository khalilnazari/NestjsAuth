import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Express } from 'express';
import { FileUploadService } from './file-upload.service';
import {
  CreateFileUploadDto,
  UpdateFileUploadDto,
} from './dto/file-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    return this.fileUploadService.create(file, body);
  }

  @Get()
  findAll() {
    return this.fileUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileUploadService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileUploadDto: UpdateFileUploadDto,
  ) {
    return this.fileUploadService.update(+id, updateFileUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileUploadService.remove(+id);
  }
}
