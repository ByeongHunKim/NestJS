# #1 정리

- 좋은 아키텍처와 구조를 가진 프레임워크
- 코드 및 api를 테스트하는 방법에 대해서 배우자
- 데코레이터는 클래스에 함수 기능을 추가할 수 있다
- nest는 컨트롤러를 비즈니스 로직과 구분 짓고 싶어한다
- 컨트롤러는 그냥 url을 가져오는 역할일 뿐이며 function을 실행하는 정도
- 그리고 나머지 비즈니스 로직은 서비스로 간다
- 서비스는 일반적으로 실제 function을 가지는 부분

## #1 Recap

- 컨트롤러의 역할
  - url을 가져오고 function을 return
  - 그리고 function을 넣는 곳은 서비스이다
  - 서비스는 필요하면 DB에 연락

# #2.0 Movies Controller

- url을 가져오고, function을 실행한다

```bash
nest g co

# ? What name would you like to use for the controller? movies
#CREATE src/movies/movies.controller.spec.ts (492 bytes)
#CREATE src/movies/movies.controller.ts (101 bytes)
#UPDATE src/app.module.ts (211 bytes)
```

# #2.1 More Routes

- request의 body 부분을 가져오고 싶은 경우
  - `@Body` 데코레이터를 사용한다
- query parameters, body decorators를 배웠다

# #2.2 Movies Service part One

## Single-responsibility principle을 따르자

- 하나의 모듈, 클래스 혹은 함수가 하나의 기능은 꼭 책임져야 한다는 것
- 다시 말하자면, 컨트롤러는 url을 매핑하고, 리퀘스트를 받고, Query를 넘기거나 Body나 그 외의 것들을 넘기는 역할을 한다
- 서비스는 로직을 관리하는 역할을 가지게 된다
  - 어떠한 한 개의 요소가 한 가지 기능은 꼭 책임져야 한다

```bash
nest g s

# ? What name would you like to use for the controller? movies
#CREATE src/movies/movies.controller.spec.ts (492 bytes)
#CREATE src/movies/movies.controller.ts (101 bytes)
#UPDATE src/app.module.ts (211 bytes)
```
