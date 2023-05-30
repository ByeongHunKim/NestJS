# controller
- Nestjs 에서 Controller 는 클라이언트의 요청(request) 를 받고, 응답(response)을 해주는 객체

## controller 생성
```shell
nest generate controller [컨트롤러이름]
# 줄여서 nest g co [컨트롤러 이름] 으로 사용 가능
```

# service
- 실제 비즈니스 로직을 정의
- 컨트롤러 객체는 클라이언트로부터 요청을 받고, 비즈니스 로직을 서비스에서 처리

## service 객체 생성
```shell
nest generate service [서비스이름]
# 줄여서 nest g s [서비스이름]
```

# Module
- 어플리케이션이 사용하는 Controller, Service, 다른 모듈 등을 정의하는 객체
- Controller, Service 등 생성 및 다른 라이브러리 모듈 사용 시 module 에 정의 해줘야함
- nest generate 명령어를 통해 Controller, Service 생성 시 자동으로 주입됨

# TypeORM
- Node.js + Typescript ORM 라이브러리
- 간편한 데이터베이스(MySQL 등) 인터페이스 제공
```shell
yarn add @nestjs/typeorm typeorm mysql2
# 환경 변수 관련된 nestjs 라이브러리
yarn add @nestjs/config
```

## Entity 정의
- Entity 는 MySQL 등 데이터베이스에서 Table 하나와 대응되는 클래스
- TypeOrmModule 밑에 entities 에 정의한 모든 Entity 추가 