import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board, BoardSchema } from "./entities/board.entity";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }])],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
