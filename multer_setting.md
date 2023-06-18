># 파일 저장소를 서버 내에 두는 경우

<br />

```sh
$ npm install -D @types/multer
```

<br />

## multer 파일 저장 세팅(서버내 저장)

```ts
import { Logger } from "@nestjs/common"
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import * as fs from 'fs';
import * as multer from "multer";
import * as path from "path";

const mkdir = (directory: string) => {
    const logger = new Logger('Mkdir');
    try {
        fs.readdirSync(path.join(process.cwd(), directory));
    } catch (e) {
        logger.log(`지정한 경로에 ${directory}가 존재하지 않아 ${directory}를 생성합니다.`)
        fs.mkdirSync(path.join(process.cwd(), directory))
    }
}

// 폴더 이름
mkdir('uploads')

export const multerOptionsFactory = (): MulterOptions => {
    return {
        storage: multer.diskStorage({

            // 저장될 파일의 위치
            destination(req, file, callback) {
                callback(null, path.join(process.cwd(), 'uploads'))
            },

            // 저장될 파일의 이름
            filename(req, file, callback) {
                const ext = path.extname(file.originalname)
                const basename = path.basename(file.originalname, ext)

                // 파일이름: basename
                // 날짜: Date.now
                // 확장자: ext
                callback(null, `${basename}_${Date.now()}${ext}`)
            },
        }),

        // 저장될 파일의 크기 제한
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    }
}
```

<br />

<br />

---

># S3 서버에 저장소를 두는 경우

<br />

```sh
$ npm i @aws-sdk/client-s3
$ npm i multer-s3
$ npm i -D @types/multer-s3
```

<br />

## multer 파일 저장 세팅(ASW S3서버에 저장)

<br />

```ts
import { S3Client } from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import * as multerS3 from 'multer-s3';
import * as path from 'path';

export const multerOptionsFactory = ( configService: ConfigService ): MulterOptions => {

    // 아마존 S3 서버에 대한 접근 권한
    const s3 = new S3Client({
        region: configService.get('AWS_BUCKET_REGION'),
        credentials: {
            accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY')
        },
    });

    return {
        // 파일의 저장장소
        storage: multerS3({
            s3,
            // 어느 버킷에 저장할지
            bucket: `${configService.get('AWS_BUCKET_NAME')}`,

            // contentType에 따라서 파일의 형식이 달라진다. 다운로드 or 뷰
            contentType: multerS3.AUTO_CONTENT_TYPE,

            // 저장할 파일의 이름, 위치를 지정할 수 있다.
            key(req, file, callback) {
                const ext = path.extname(file.originalname)
                const basename = path.basename(file.originalname, ext)

                callback(null, `uploads/${basename}_${Date.now()}${ext}`)
            },
        }),
        limits: { fileSize: 10 * 1024 * 1024 },
    }
};
```

---

*※주의사항*

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
  }
}
```

<br />

tsconfig.json의 설정이 위와 같이 되어있을 경우에는 `import * as fs from "fs"`와 같이 명시하여 사용해주어야한다.

<br />

```ts
// import fs from "fs";
import * as fs from "fs";
```
