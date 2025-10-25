import 'dotenv/config';

/* 
  knex 스키마 빌더용 설정 파일 입니다 원래대로 라면 ignore처리 후 별개로 공유하는게 맞지만
  과제 제출 환경이니 함께 올리겠습니다
*/
const knexConfig = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'temp00!',
      database: 'temperature',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    //commonCodes같은 초기값 넣을 때 좋음
    seeds: {
      directory: './seeds',
    },
  },
};

export default knexConfig;
