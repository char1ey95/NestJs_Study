# Multer

<br />

## 단일, 다중, 특정 개수를 지정한 업로드 가능

<br />

## Multer 단일 설정

```ts
@Post('upload')
@UseInterceptors(FileInterceptor('file', [Options]))
@Bind(UploadedFile())
uploadFile(file) {
    console.log(file);
}
```

## Multer 다중 설정

```ts
@Post('upload')
@UseInterceptors(FilesInterceptor('files', [maxCount], [Options]))
@Bind(UploadedFiles())
uploadFile(files) {
  console.log(files);
}
```

**Options**

1. storage : 저장 방식 설정(디스크, 메모리)
2. fileFilter: 파일 유효성 체크
3. limits : 업로드 시 제한 설정

