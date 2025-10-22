import 'dotenv/config';

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
