># Mongoose Of Nest

<br />

## 스키마 정의

<br />

```ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    address: string;

    @Prop()
    imgUrl: string;

    @Prop()
    nickname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

<br />

- `@Schema`는 정의된 클래스를 스키마 정의로 표시하는 데코레이터이다.
- User라는 클래스는 MongoDB 컬렉션(Collection)에 맵핑되지만, 실제로 Mongo에 들어가는 컬렉션 이름은 s가 붙은 users가 된다.

<br />

## 관계정의

<br />

```ts
import * as mongoose from "mongoose";
import { User } from "./user.schema";

// Schema Class 내부에
@Props({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
user: User;
```

<br />

- 다른 모델과의 관계를 정의하는 경우에 위와 같은 type과 ref에 명시해주어야한다.

## 중첩 객체를 나타내는 경우

<br />

```ts
@Props(raw({
    userid: { type: String },
    userpw: { type: String }
}))
userinfo: Record<string, any>
```

<br />

## 데코레이터를 사용하지 않고 기존의 Mongoose 처럼 사용하는 경우

<br />

```ts
export const UserSchema = new mongoose.Schema({
    address: String,
    imgUrl: String,
    nickname: String
})
```