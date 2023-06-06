# Nest

-   Typescript 기반, NodeJs 프레임워크이다.

```sh
$ npm i -g @nestjs/cli
$ nest new [project-name]
```

-   서버를 여는 명령어

```
npm run start
```

## src 디렉토리

-   controller : 라우팅하는 부분
-   module : 의존성을 주입하는 부분
-   service : 비지니스 로직을 처리하는 부분

`controller`로 들어온 요청을 라우팅하여 알맞은 곳에 보낸다.
`controller`에서는 service를 주입받아 사용한다.
`service`에서는 비지니스 로직(데이터 요청)을 처리한다.

## decorater

-   get
-   post
-   put
-   delete
-   ...

## Nest에서 제공하는 것(데코레이터 - 개체)

-   `@Request(), @Req()`: req
-   `@Response(), @Res()`: res
-   `@Next()`: next
-   `@Session()`: req.session
-   `@Param(key?: string)`: req.params/req.params[key]
-   `@Body(key?: string)`: req.body/req.body[key]
-   `@Query(key?: string)`: req.query/req.query[key]
-   `@Headers(name?: string)`: req.headers/req.headers[name]
-   `@Ip()`: req.ip
-   `@HostParam()`: req.hosts

**커스텀 데코레이터 생성법**
- url: https://docs.nestjs.com/custom-decorators