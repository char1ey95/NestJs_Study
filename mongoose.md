# Mongoose


## Mongoose 설치

<br />

```sh
$ npm install mongoose
```

<br />

## Mongoose 연결

```js
import mongoose from "mongoose";

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParse: true,
});

const database = mongoose.connection;

database.on("error", (error) => console.log("DataBase Error Message : ", error))
database.once("open", () => console.log("Connection to DataBase"))
```

<br />

## Mongoose Schema

MongoDB는 NoSQL이므로 스키마가 존재하지 않지만, Mongoose에는 RDBMS처럼 Schema를 정의할 수 있다.

SQL의 스키마와 비슷하게 Document 내부의 각 Field가 어떤 식으로 되어있는지 정의한다.

Mogoose의 Schema는 SQL의 Table과 비슷한 개념이라고 생각하면된다.

<br />

```js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true, unique: true },
    classTime: { type: String, required: true },
    instructor: { type: String, required: true }
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentID: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    semester: { type: String, required: true, unique: true },
    courses: [{
        type: mongoose.Schema.Types.ObjectId, required: true, ref: "course"
    }]
})

const courseModel = mongoose.model("course", courseSchema)
const userModel = mongoose.model("user", userSchema)
```