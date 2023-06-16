import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
    uploadFile(file: Express.Multer.File) {
        console.log(file)
        if(!file) throw new BadRequestException('파일이 존재하지 않습니다.')
        
        return { filePath: file.path }
    }

    uploadFileForS3(file: Express.MulterS3.File) {
        console.log(file)
        if(!file) throw new BadRequestException('파일이 존재하지 않습니다.')
        
        return { filePath: file.location }
    }
}
