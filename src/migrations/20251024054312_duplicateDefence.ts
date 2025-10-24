import type { Knex as KnexType } from 'knex';

export async function up(knex: KnexType) {
  // 1. 중복값 확인을 위해 uniqueKey 추가
  await knex.raw(`
    ALTER TABLE temperature.temperaturelog
    ADD UNIQUE KEY uniq_device_time (registeredAt, deviceId);
    `)
    console.log(`✅ add unique key uniq_device_time `);
}

export async function down(knex) {
  // 1. 인덱스 롤백
  await knex.raw(`
    ALTER TABLE temperature.temperaturelog 
    DROP INDEX uniq_device_time;
  `);
  console.log(`✅ dorp unique key uniq_device_time `);
}