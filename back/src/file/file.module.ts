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
