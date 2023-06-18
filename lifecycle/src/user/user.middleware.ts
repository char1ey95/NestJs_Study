import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from "express";

// @Injectable()
// export class UserMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     console.log("This is MiddleWare")
//     next();
//   }
// }

// 함수형 미들웨어
export const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('This is Function MiddleWare')
  next();
}