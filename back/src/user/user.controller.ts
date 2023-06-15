import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Get()
    getUser(): any{
        return this.userService.findAll();
    }

    @Post()
    createUser(@Body() user: any): any{
        return this.userService.create(user);
    }
}
