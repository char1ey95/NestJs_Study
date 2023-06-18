# Nest Multer 사용방법

<br />

## 세팅 해야하는 목록

<br />

1. multerOption(multer setting 파일)
2. module.ts
3. controller.ts
4. service.ts

<br />

## 1. multerOption(multer setting 파일)

- 크게 서버내저장 vs S3 서버에 저장으로 나뉘어 세팅방식이 조금 차이가 있다.

## 2. Module.ts

- 모듈에서 Multer를 사용할 수 있도록 세팅이 필요하다.

```ts
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from "@nestjs/platform-express";
// import { multerOptionsFactory } from "src/common/utils/multer.options.factory";
import { multerOptionsFactory } from "src/common/utils/multer.options.factoryS3";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
```

## 3. Controller.ts

- interceptor의 개념: ''

```ts
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";

@Controller('경로')
export class FileController {
    constructor(private readonly fileService: FileService){}

    @Post()
    @UseInterceptors(FileInterceptor('Key'))
    uploadFile(@UploadedFile() file: Express.Multer.File){
        return this.fileService.uploadFile(file);
    }
}
```

## 4. Service.ts

```ts
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
    uploadFile(file: Express.Multer.File) {
        console.log(file)
        if(!file) throw new BadRequestException('파일이 존재하지 않습니다.')
        
        return { filePath: file.path }
    }
}

```