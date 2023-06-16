import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from "./config/configuration";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration]
  }), MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`), UserModule, BoardModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}  