import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMiddleware } from "./user.middleware";

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // forRoutes의 인자에는 미들웨어를 적용시킬 경로를 적어주어야한다.
    // consumer.apply(UserMiddleware).forRoutes('user')

    // path와 method 옵션을 이용해서 경로와 메서드를 지정 가능하다.
    // consumer.apply(UserMiddleware).forRoutes({ path: 'user*', method: RequestMethod.HEAD })
    
    // 특정 클래스에만 미들웨어가 적용되도록 할 수 있다.
    // consumer.apply(UserMiddleware).forRoutes(UserController, UserService)
    
    // 특정 경로를 제외하고 미들웨어를 적용할 수 있다.
    consumer.apply(UserMiddleware).exclude({ path: 'user', method: RequestMethod.POST }).forRoutes('user')
    
    // 함수형 미들웨어를 만들어서 적용할 수도 있다.
  }
}
