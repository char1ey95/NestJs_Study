# **Nest**

- Typescript 기반, NodeJs 프레임워크이다.

```sh
$ npm i -g @nestjs/cli
$ nest new [project-name]
```

<br />

- 서버를 여는 명령어

```sh
$ npm run start
$ npm run start:dev
```

<br />

<br />

>## **src 디렉토리**

<br />

```
   src
    |
    |-- app.controller.test.ts
    |-- app.controller.ts
    |-- app.module.ts
    |-- app.service.ts
    |-- main.ts
```

- app.controller.test.ts : controller에 대한 단위 테스트 파일
- app.controller.ts : 단일 경로가 있는 기본 컨트롤러 파일
- app.module.ts : 어플리케이션의 루트 모듈
- app.service.ts : 하나의 메서드만 있는 기본 서비스 파일
- main.ts : `NestFactory`을 이용하여 Nest App 인스턴스를 생성하는 엔트리(시작지점) 파일.

<br />

## **main.ts**의 구조

<br />

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
```

`NestFactory`에는 App 인스턴스를 생성할 수 있는 정적 메서드(ex.create)를 가지고 있으며, create 메서드는 app(express()의 반환값과 비슷한 역할)을 반환한다.

App을 만드는 과정에서 에러가 발생하면 App은 코드와 함께 종료된다.

옵션을 통해서 사용하면 비활성화 할 수 있다.

<br />

```ts
const app = await NestFactory.create(AppModule, { abortOnError: false })
```

<br />

<br />

>## **Controller**

<br />

- 클라이언트에서 온 요청을 받아 처리하여 응답을 반환하는 역할을 한다.
- 컨트롤러의 역할은 앱에 대한 요청을 받는 것(수신)이다.
- 라우팅은 컨트롤러에 들어오는 요청이 어떤 것인지에 따라 제어하며, 경로가 다르다면 다른 작업을 수행하도록 한다.

<br />

<img src="https://docs.nestjs.com/assets/Controllers_1.png">

<br />

다음은 CRUD 프로젝트를 빠르게 생성하는 명령어이다.

```sh
$ nest g resource [폴더 및 파일명]
```

명령어를 이용해서 프로젝트르 생성하면, 다음의 구조를 가진 폴더가 src 폴더 안에 생성된다.

```
[src]
 |
 | -- [새폴더]
 |       | -- [dto]
 |       |      | -- create*.ts
 |       |      | -- update*.ts
 |       |
 |       | -- [entities]
 |       |      | -- entities.ts
 |       |
 |       | -- *.controller.test.ts
 |       | -- *.controller.ts
 |       | -- *.service.test.ts
 |       | -- *.service.ts
 |       | -- *.module.ts

```

<br />

### **라우팅 방법**

라우팅을 하기위해서는 @Controller()와 같은 데코레어티러르 사용한다.

```ts
import { Controller, Get } from "@nestjs/common";

@Controller('[경로명]')
export class ExController {
    @Get()
    exFunction(): string {
        return '결과값';
    }
}
```

위와 같이 작성하면, `get: /[경로명]`으로 들어오는 요청을 받을 수가 있다.

들어온 요청에 따라서 exFunction이 실행된다.

<br />

<br />

### *request object

<br />

req 객체에 직접 접근해야하는 경우에는 @Req() 데코레이터를 이용해서 요청 객체에 직접 접근이 가능하다.

```ts
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('list')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): List {
    console.log(request)
    // request 객체에 접근이 가능해진다.
    return { idx: 1, subject: "첫번째 글입니다.", content: "글 내용"};
  }
}
```

<br />

### ※ Nest 제공 데코레이터

- `@Request(), @Req()`: request
- `@Response(), @Res()`: response
- `@Next()`: next
- `@Session()`: req.session
- `@Param(key?: string)`: req.params/req.params[key]
- `@Body(key?: string)`: req.body/req.body[key]
- `@Query(key?: string)`: req.query/req.query[key]
- `@Headers(name?: string)`: req.headers/req.headers[name]
- `@Ip()`: req.ip
- `@HostParam()`: req.hosts

<br />

<br />

## **커스텀 데코레이터 생성법**

- https://docs.nestjs.com/custom-decorators

<br />
<br />
<br />

### 경로에 와일드카드 설정하는 법

<br />

```ts
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
```

### 상태코드 설정하는 법( default === 200 )

<br />

```ts
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

### 리다이렉트

<br />

```ts
@Get()
@Redirect(url, 상태코드)
```

### 라우팅 파라미터

<br />

```ts
@Get(':id')
findOne(@Param() params: any): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

### express 방식으로 응답하기

<br />

```ts
import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
     res.status(HttpStatus.OK).json([]);
  }
}
```

<br />

<br />

<br />

>## **Provider**

