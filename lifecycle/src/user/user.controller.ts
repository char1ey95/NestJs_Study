import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CustomException } from "src/common/exception/custom.exception";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  helloController(): string {
    console.log("This is Controller")
    this.userService.helloService()
    return "success"
  }

  @Get('exception')
  exception(){
    throw new CustomException();

    // 예제 2
    const error = new Error("error example")
    throw new HttpException({
      anistring: "example",
      error: "any error message",
      anyAttributes: "any attributes"
    }, HttpStatus.BAD_REQUEST, {
      cause: error
    })

    // 예제 1
    throw new HttpException('example', HttpStatus.BAD_GATEWAY)
  }

  // 응답 1
  // {
  //   "statusCode": 502,
  //   "message": "example"
  // }

  // 응답 2
  // {
  //   "anistring": "example",
  //   "error": "any error message",
  //   "anyAttributes": "any attributes"
  // }
}
