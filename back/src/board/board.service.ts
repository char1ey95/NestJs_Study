import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Board } from "./entities/board.entity";
import { Model } from "mongoose";

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board.name) private boardModel: Model<Board>){}

  async create(createBoardDto: CreateBoardDto) {
    try {
      if(!createBoardDto.userid) throw Error("아이디를 입력해주세요")
      if(!createBoardDto.subject) throw Error("제목을 입력해주세요")
      if(!createBoardDto.content) throw Error("내용을 입력해주세요")
      const createdBoard = new this.boardModel(createBoardDto)
      return createdBoard.save();
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<Board[]> {
    return this.boardModel.find().exec();
}

  findOne(id: number) {
    return this.boardModel.findOne({ boardid: id });
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    console.log(updateBoardDto)
    return await this.boardModel.updateOne({ boardid: id}, updateBoardDto);
  }

  remove(id: number) {
    return this.boardModel.deleteOne({ boardid: id });
  }
}
