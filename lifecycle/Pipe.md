# 파이프(Pipe)

일반적으로 파이프는 변환, 유효성 검사 등의 역할을 한다.

예외처리에 기능을 추가한것과 비슷하다.

1. 변환
    - 입력 데이터의 형변환

2. 유효성 검사(validation)
    - 입력 데이터가 유효한지 검사하여, 유효하면 전달해주고 그렇지 않다면 exception을 throw 하여 돌려보낸다.

<br />

<br />

>## 기본 지원 파이프

기본적으로 지원하는 파이프는 다음과 같다.

- ValidationPipe
- ParseIntPipe
- ParseFloatPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- DefaultValuePipe
- ParseFilePipe

>## 라우터에 적용 시키는 방법

파이프는 경로처리기(Params, Query 등등)에 적용시켜 유효성을 검사한다.

```ts
// 파이프를 그대로 넣어주는 경우
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}

// 파이프를 생성하여 넘겨주는 경우
@Get(':id')
async findOne(
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
) {
  return this.catsService.findOne(id);
}
```

위와 같이 Param의 두번째 인자에서 사용할 수 있다.

위의 예씨는 Params의 경로에 number 값이 와야하는데, string 값이 왔을 경우에 에러를 throw 한다.

>## 커스텀 파이프 생성

```ts
import { PipeTransform, Injectable } from '@nestjs/common';

interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<unknown>;
  data?: string;
}

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

