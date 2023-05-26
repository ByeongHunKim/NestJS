# nestjs로 REST API 찍어내기
# [reference link](https://www.daleseo.com/nestjs-rest-api/)

# 느낀점
- 아직 감이 안 온다..
- ORM(typeORM, Prisma)를 쓰지 않고 entity를 생성했는데, 쓴 경우는 어떻게 달라지는 지 궁금하다
- Swagger연동하는 것은 재미있었다

## 목표
- 분산 시스템 환경에서 가장 흔하게 접할 수 있는 백엔드 어플리케이션은 아마도 특정한 도메인의 데이터를 관리해주는 REST API 이다
- 그래서 nest를 이용하면 얼마나 효과적으로 이러한 전형적인 REST API를 개발할 수 있는 지 알아보자

## 실습 프로젝트 구성
```bash
nest new our-nestjs
# select npm
nest generate resource users
# select REST API -> yes
# 그러면 src/users/ 디렉토리 안에 총 8개의 파일이 생성된다
# app.module.ts 파일에서 추가된 모듈을 불러오도록 수정된 것을 확인할 수 있다
```

## 코드 자동생성
- REST API 는 대부분의 경우 유지보수가 용이하도록 여러 layer 로 나누어 설게한다
- 역할
  - controller 클래스
    - HTTP 요청을 받아서 응답
  - service 클래스
    - 비지니스 로직을 처리
  - entity 클래스
    - 해당 어플리케이션에서 관리되는 하나의 데이터를 나타내기 위해서 사용된다
  - DTO(data transfer object)클래스
    - 외부로부터 유입되는 데이터를 나타내기 위해서 사용된다
- 이러한 클래스들을 하나씩 손수 일일이 생성하는 것은 상당히 지루하고, 번거롭다
- 그래서 `$ nest generate resource` 라는 cli 명령어를 통해 REST API 를 개발하는데 필요한 클래스를 일괄적으로 자동 생성해준다

## Entity
- 많은 REST API 가 뒷 단에 데이터베이스를 두고 요청받은 HTTP 메서드(POST, PATCH, GET, DELETE)에 따라 소위 CRUC(Create, Update, Read, Update) 작업을 처리하게 된다
- NestJS에서는 엔티티 클래스를 통해서 REST API에서 관리하는 데이터를 모델링한다

## 자동 문서와
- REST API 를 개발할 때 문서화도 중요하지만 간과하기 쉬운 부분이 있다
- NestJS 는 REST API 의 실제 코드에서 Open API 규격에 맞는 문서를 자동으로 추출할 수 있는 Swagger 통합도 지원한다
- 이렇게 만든 문서 페이지에는 실제 REST API 호출도 가능하기 때문에, 테스트 측면에서도 매우 유용하게 활용할 수 있다
- 실습
```bash
npm i @nestjs/swagger
# 그리고 main.ts 파일 수정 -> nestjs앱이 구동될 때 Swagger도 셋업이 되도록 수정
```
```typescript
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle("Users API")
      .setDescription("This is a sample REST API")
      .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document)
  await app.listen(3000);
}
bootstrap();
```
- 마지막으로 프로젝트 최상위 경로에 있는 nest-cli.json 파일에 `@nestjs/swagger`를 플러그인으로 설정
- 이렇게 해주면 굳이 엔티티 클래스와 DTO 클래스에 일일이 Swagger 관련 데코레이터를 추가해주지 않아도 Swagger에게 스키마로 인식되게 된다
```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "plugins": [
      {
        "name": "@nestjs/swagger",
        "options": {
          "introspectComments": true
        }
      }
    ]
  }
}

```