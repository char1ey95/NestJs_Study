import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomException extends HttpException {
    constructor() {
        super('customException', 203)
    }
}