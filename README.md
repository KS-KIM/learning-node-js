# learning-node-js

## To Do Appilcation 구현

### Todo Domain

- Todo 항목 추가하기
- Todo 목록 조회하기
- Todo 항목 수정하기
- Todo 항목 제거하기

### User Domain

- User 추가하기
- 로그인 / 로그아웃하기


## package 분리 전략

- api: api와 관련된 routers
- lib: 분리하여 관리할 수 있는 libraries
- models: mongoose models
- pages: page render와 관련된 routers
- views: server side에서 렌더링되는 ejs 파일


## 추가 과제

### 인증 / 인가

- 서버 내 세션 저장소 분리하기 (connect-mongo)
- 데이터베이스 RDBMS로 마이그레이션 하기 (koa-mysql)
- 회원가입 구현 및 비밀번호 암호화 (bcrypt)
- 인수 테스트(통합 테스트), 단위 테스트 구성하기 (jest)
- 외부 계정 로그인 기능 구현하기 (oauth 2.0)
- 토큰 인증방식으로 변경하기 (jsonwebtoken)
- 사용자 이미지 업로드 구현 (local 저장방식 또는 S3 Storage 이용)
- XSS 방지 및 HTTPS 통신 유지 (helmet)
- CSRF 방지
