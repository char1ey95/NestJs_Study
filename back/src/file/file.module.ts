import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from "@nestjs/platform-express";
import { multerOptionsFactory } from "src/common/utils/multer.options.factory";

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
