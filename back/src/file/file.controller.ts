import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService){}

    @Post()
    @UseInterceptors(FileInterceptor('file_test'))
    uploadFile(@UploadedFile() file: Express.Multer.File){
        console.log(file)
        return this.fileService.uploadFile(file);
    }
}
