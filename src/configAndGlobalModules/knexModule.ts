import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';

@Global()
@Module({
  providers: [
    {
      provide: 'knex',
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Knex => {
        return knex({
          client: configService.get<string>('DB_CLIENT'),
          connection: {
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            user: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PW'),
            database: configService.get<string>('DB_NAME'),
          },
          pool: { min: 2, max: 10 },
        });
      },
    },
  ],
  exports: ['knex'],
})
export class KnexModule {}
