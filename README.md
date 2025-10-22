 실행 환경 
  - runtime: node -v22.20.0
  - db: mysql -v8.0.43v
      - user: root
      - pw: temp00!
      - dbName: temperature [CREATE DATABASE temperature;]

1. 위 환경을 로컬 환경에 구축 해주세요
2. 프로젝트를 checkout 후, 해당 디렉토리의 터미널을 오픈 npm install으로 패키지를 받아주세요
3. src 경로로 이동, cli로 npx knex migrate:latest 로 스키마 세팅을 진행 해주세요 
4. npm run start로 작동. port는 기본 3000입니다.



----- 기타
 o 스키마 빌더 쓴 이유
    - 서버 개발자가 스키마 형상관리 가능
    - 여러 영역에 스키마 구조 동시적용 편리